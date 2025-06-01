import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("gurueternity");
    
    const tenders = await db.collection("tender_submissions")
      .find({ type: 'tender' }) // Only get tender submissions
      .sort({ score: -1 })
      .toArray();

    return NextResponse.json(tenders);
  } catch (error) {
    console.error('Error fetching tenders:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tenders' },
      { status: 500 }
    );
  }
} 