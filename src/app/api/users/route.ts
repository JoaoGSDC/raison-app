import { NextResponse } from 'next/server';
import { Db } from 'mongodb';
import bcrypt from 'bcrypt';
import connectToDatabase from '../utils/dbConnect';

connectToDatabase();

export async function GET(_: any) {
  try {
    const db: Db = await connectToDatabase();

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

const SALT_ROUNDS = 10;
const REQUIRED_FIELDS = ['name', 'email', 'password'];
export async function POST(request: Request) {
  try {
    const db: Db = await connectToDatabase();

    const { name, email, password } = await request.json();

    const checkedFields = validateRequiredFields({ name, email, password }, REQUIRED_FIELDS);

    if (checkedFields.hasError) {
      return NextResponse.json({ error: checkedFields.requireds }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const users = await db.collection('users').insertOne({
      name,
      email,
      password: hashedPassword,
      createdAt: new Date(),
    });

    return NextResponse.json(
      {
        id: users.insertedId,
        name,
        email,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(error);
  }
}
