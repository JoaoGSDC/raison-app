import { NextResponse } from 'next/server';
import { Db } from 'mongodb';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import connectToDatabase from '../utils/dbConnect';

connectToDatabase();

const REQUIRED_FIELDS = ['email', 'password'];
export async function POST(request: Request) {
  try {
    const db: Db = await connectToDatabase();

    const { email, password } = await request.json();

    const checkedFields = validateRequiredFields({ email, password }, REQUIRED_FIELDS);

    if (checkedFields.hasError) {
      return NextResponse.json({ error: checkedFields.requireds }, { status: 400 });
    }

    const user = await db.collection('users').findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return NextResponse.json({ error: `Invalid authentication params` }, { status: 401 });
    }

    const token = jwt.sign({ userId: user._id, email: user.email }, process.env.SECRET_KEY as string, {
      expiresIn: '48h',
    });

    return NextResponse.json(
      {
        email,
        token,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(error);
  }
}
