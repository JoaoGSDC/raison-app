import { NextResponse } from 'next/server';
import { Db, ObjectId } from 'mongodb';
import connectToDatabase from '../../utils/dbConnect';

connectToDatabase();

export async function GET(_: any, { params }: { params: { id: string } }) {
  try {
    const db: Db = await connectToDatabase();

    const { id } = params;

    const establishment = await db.collection('establishments').findOne({ _id: new ObjectId(id) });

    return NextResponse.json(establishment);
  } catch (error) {
    return NextResponse.json(error);
  }
}

const REQUIRED_FIELDS = ['name', 'category', 'street', 'number', 'neighborhood', 'city', 'state'];
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const db: Db = await connectToDatabase();

    const { id } = params;
    const { name, category, street, number, neighborhood, city, state } = await request.json();

    const checkedFields = validateRequiredFields(
      { name, category, street, number, neighborhood, city, state },
      REQUIRED_FIELDS
    );

    if (checkedFields.hasError) {
      return NextResponse.json({ error: checkedFields.requireds }, { status: 400 });
    }

    await db.collection('establishments').updateOne(
      { _id: new ObjectId(id) },
      {
        name,
        category,
        street,
        number,
        neighborhood,
        city,
        state,
      }
    );

    return NextResponse.json(
      {
        id,
        name,
        category,
        street,
        number,
        neighborhood,
        city,
        state,
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

    await db.collection('establishments').deleteOne({ _id: new ObjectId(id) });

    return NextResponse.json({ message: `Estabelecimento deletado com sucesso!` }, { status: 200 });
  } catch (error) {
    return NextResponse.json(error);
  }
}
