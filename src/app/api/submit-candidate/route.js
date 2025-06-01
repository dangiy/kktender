import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import clientPromise from '@/lib/mongodb';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_KEY);

export async function POST(request) {
  try {
    const candidateData = await request.json();

    // Generate evaluation using Gemini
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const prompt = `
      Evaluate this tender submission based on the following criteria:
      - Technical expertise and experience
      - Project management capabilities
      - Financial stability and resources
      - Past achievements and track record
      - Innovation and problem-solving approach

      Candidate Information:
      Name: ${candidateData.name}
      College: ${candidateData.college}
      Experience: ${candidateData.experience} years
      Projects: ${JSON.stringify(candidateData.projects)}
      Achievements: ${candidateData.achievements.join(', ')}

      Provide a detailed evaluation and assign a score from 0-100.
      Format your response as:
      Evaluation: [your detailed evaluation]
      Score: [number between 0-100]
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const evaluation = response.text();

    // Extract score from evaluation
    const scoreMatch = evaluation.match(/Score:\s*(\d+)/);
    const score = scoreMatch ? parseInt(scoreMatch[1]) : 0;

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db();

    // Check if collection exists, if not create it
    const collections = await db.listCollections().toArray();
    const tenderCollectionExists = collections.some(col => col.name === 'tender_submissions');

    if (!tenderCollectionExists) {
      await db.createCollection('tender_submissions');
    }

    // Insert submission with evaluation
    const submission = {
      ...candidateData,
      evaluation,
      score,
      status: score >= 70 ? 'Shortlisted' : 'Not Shortlisted',
      submittedAt: new Date(),
    };

    await db.collection('tender_submissions').insertOne(submission);

    return NextResponse.json({ 
      success: true, 
      evaluation,
      score,
      status: submission.status
    });

  } catch (error) {
    console.error('Error processing submission:', error);
    return NextResponse.json(
      { error: 'Failed to process submission' },
      { status: 500 }
    );
  }
} 