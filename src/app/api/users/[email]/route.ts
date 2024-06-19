import { NextResponse } from 'next/server';
import { Db, ObjectId } from 'mongodb';
import connectToDatabase from '../../utils/dbConnect';

connectToDatabase();

export async function GET(_: any, { params }: { params: { email: string } }) {
  try {
    const db: Db = await connectToDatabase();

    const { email } = params;

    const user = await db.collection('users').findOne({ email });

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(error);
  }
}

export async function PATCH(request: Request, { params }: { params: { email: string } }) {
  try {
    const db: Db = await connectToDatabase();

    const { email } = params;
    const { name, dateOfBirth, picture } = await request.json();

    await db.collection('users').updateOne(
      { email },
      {
        $set: {
          name,
          dateOfBirth,
          picture,
        },
      }
    );

    return NextResponse.json(
      {
        email,
        name,
        dateOfBirth,
        picture,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(error);
  }
}

export async function DELETE(_: any, { params }: { params: { id: string } }) {
  try {
    const db: Db = await connectToDatabase();

    const { id } = params;

    await db.collection('users').deleteOne({ _id: new ObjectId(id) });

    return NextResponse.json({ message: `Estabelecimento deletado com sucesso!` }, { status: 200 });
  } catch (error) {
    return NextResponse.json(error);
  }
}
