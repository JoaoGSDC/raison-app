import { NextResponse } from 'next/server';
import { Db } from 'mongodb';
import connectToDatabase from '../../../utils/dbConnect';

connectToDatabase();

export async function GET(_: any, { params }: { params: { email: string } }) {
  try {
    const db: Db = await connectToDatabase();
    const { email } = params;

    const user = await db.collection('users').findOne({ email });

    if (!user || !user.followers) {
      return NextResponse.json({ error: 'User or followers not found' }, { status: 404 });
    }

    const { followers } = user;

    const followersDetails = await db
      .collection('users')
      .find({ email: { $in: followers } })
      .toArray();

    return NextResponse.json(followersDetails);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
