import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Candidate } from '@/types/candidate';
import clientPromise from '@/lib/mongodb';

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(request: Request) {
  try {
    const candidateData: Candidate = await request.json();

    // Generate a prompt for Gemini to evaluate the candidate
    const prompt = `
      Evaluate this tender application and assign a score from 0-100 based on the following criteria:
      - Experience quality and relevance
      - Project complexity and impact
      - Technical capabilities and expertise
      - Past achievements and track record
      
      Tender Profile:
      Name: ${candidateData.name}
      Organization: ${candidateData.college}
      Experience: ${JSON.stringify(candidateData.experience)}
      Skills: ${candidateData.skills.join(', ')}
      Projects: ${JSON.stringify(candidateData.projects)}
      Achievements: ${candidateData.achievements.join(', ')}
      
      Provide a score and brief justification. Format the response as:
      Score: [number]
      Justification: [brief explanation]
    `;

    // Get Gemini's evaluation
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const evaluation = response.text();

    // Extract score from Gemini's response
    const scoreMatch = evaluation.match(/Score:\s*(\d+)/);
    const score = scoreMatch ? parseInt(scoreMatch[1]) : 0;

    // Store the candidate data with their score
    const tenderData = {
      ...candidateData,
      score,
      evaluation,
      tenderId: `T${Date.now()}`, // Unique tender ID
      submittedAt: new Date().toISOString(),
      status: 'pending', // pending, shortlisted, rejected
      type: 'tender', // to distinguish from other collections
      version: 1, // for future schema updates
    };

    // Store in MongoDB in a separate collection
    const client = await clientPromise;
    const db = client.db("gurueternity");
    
    // Check if collection exists, if not create it
    const collections = await db.listCollections().toArray();
    const tenderCollectionExists = collections.some(col => col.name === 'tender_submissions');
    
    if (!tenderCollectionExists) {
      await db.createCollection('tender_submissions');
      // Create indexes
      await db.collection('tender_submissions').createIndex({ tenderId: 1 }, { unique: true });
      await db.collection('tender_submissions').createIndex({ score: -1 });
      await db.collection('tender_submissions').createIndex({ submittedAt: -1 });
    }

    await db.collection('tender_submissions').insertOne(tenderData);

    return NextResponse.json(tenderData);
  } catch (error) {
    console.error('Error processing tender:', error);
    return NextResponse.json(
      { error: 'Failed to process tender application' },
      { status: 500 }
    );
  }
} 