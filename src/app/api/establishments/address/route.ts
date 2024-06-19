import { NextRequest, NextResponse } from 'next/server';
import { Db, ObjectId } from 'mongodb';
import connectToDatabase from '../../utils/dbConnect';

connectToDatabase();

export async function GET(req: NextRequest) {
  try {
    const db: Db = await connectToDatabase();

    const url = new URL(req.url);

    const postalCode = url.searchParams.get('postalCode');
    const number = url.searchParams.get('number');

    const establishment = await db.collection('establishments').findOne({ postalCode, number });

    return NextResponse.json(establishment);
  } catch (error) {
    return NextResponse.json(error);
  }
}
