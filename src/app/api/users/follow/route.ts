import { NextResponse } from 'next/server';
import { Db } from 'mongodb';
import connectToDatabase from '../../utils/dbConnect';
import admin from '../../utils/firebaseAdmin';

export async function PATCH(request: Request) {
  try {
    const db: Db = await connectToDatabase();

    const authHeader = request.headers.get('Authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    const decodedToken = await admin.auth().verifyIdToken(token);
    const email = decodedToken.email;

    const { user } = await request.json();

    const currentAuthenticateUser = await db.collection('users').findOne({ email });

    const following = [...currentAuthenticateUser?.following, user];

    await db.collection('users').updateOne(
      { email },
      {
        $set: { following },
      }
    );

    const updatedUser = await db.collection('users').findOne({ email });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    return NextResponse.json(error);
  }
}
