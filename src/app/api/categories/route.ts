import { NextResponse } from 'next/server';
import { Db } from 'mongodb';
import connectToDatabase from '../utils/dbConnect';

connectToDatabase();

export async function GET(_: any) {
  try {
    const db: Db = await connectToDatabase();

    const establishments = await db.collection('categories').find().toArray();
    return NextResponse.json(establishments);
  } catch (error) {
    return NextResponse.json(error);
  }
}
