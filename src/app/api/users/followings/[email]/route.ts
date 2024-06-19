import { NextResponse } from 'next/server';
import { Db } from 'mongodb';
import connectToDatabase from '../../../utils/dbConnect';

connectToDatabase();

export async function GET(_: any, { params }: { params: { email: string } }) {
  try {
    const db: Db = await connectToDatabase();
    const { email } = params;

    const user = await db.collection('users').findOne({ email });

    if (!user || !user.following) {
      return NextResponse.json({ error: 'User or following not found' }, { status: 404 });
    }

    const { following } = user;

    const followingDetails = await db
      .collection('users')
      .find({ email: { $in: following } })
      .toArray();

    return NextResponse.json(followingDetails);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
