import { NextResponse } from 'next/server';
import { Db } from 'mongodb';
import connectToDatabase from '../../../utils/dbConnect';

connectToDatabase();

export async function GET(_: any, { params }: { params: { username: string } }) {
  try {
    const db: Db = await connectToDatabase();

    const { username } = params;

    const user = await db.collection('users').findOne({ username });

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(error);
  }
}
