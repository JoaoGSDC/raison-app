import { NextResponse } from 'next/server';
import { Db } from 'mongodb';
import connectToDatabase from '../../../utils/dbConnect';

connectToDatabase();

export async function GET(request: Request, { params }: { params: { user: string } }) {
  try {
    const db: Db = await connectToDatabase();

    const { user } = params;

    const authHeader = request.headers.get('Authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const feedbacks = await db
      .collection('feedbacks')
      .find({ user })
      .sort({
        createdAt: -1,
      })
      .toArray();
    return NextResponse.json(feedbacks);
  } catch (error) {
    return NextResponse.json(error);
  }
}
