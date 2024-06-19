import { NextResponse } from 'next/server';
import { Db } from 'mongodb';
import connectToDatabase from '../utils/dbConnect';

connectToDatabase();

export async function GET(req: any) {
  try {
    const db: Db = await connectToDatabase();

    const url = new URL(req.url);

    const email = url.searchParams.get('email');

    if (email) {
      const user = await db.collection('users').findOne({ email });
      return NextResponse.json(user);
    }

    const users = await db
      .collection('users')
      .find()
      .sort({
        createdAt: -1,
      })
      .toArray();

    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(error);
  }
}

export async function POST(request: Request) {
  try {
    const db: Db = await connectToDatabase();

    const { name, dateOfBirth, username, email } = await request.json();

    const users = await db.collection('users').insertOne({
      picture: '',
      name,
      email,
      dateOfBirth,
      username,
      following: [],
      followers: [],
      posts: [],
      active: true,
      createdAt: new Date(),
    });

    return NextResponse.json(
      {
        id: users.insertedId,
        name,
        email,
        dateOfBirth,
        username,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(error);
  }
}
