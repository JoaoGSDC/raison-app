import { NextResponse } from 'next/server';
import { Db } from 'mongodb';
import connectToDatabase from '../utils/dbConnect';

connectToDatabase();

export async function GET(_: any) {
  try {
    const db: Db = await connectToDatabase();

    const establishments = await db
      .collection('establishments')
      .find()
      .sort({
        createdAt: -1,
      })
      .toArray();

    const formattedEstablishments = establishments.map((establishment) => ({
      id: establishment._id.toString(),
      coordinate: {
        latitude: Number(establishment.lat),
        longitude: Number(establishment.lng),
      },
    }));

    return NextResponse.json(formattedEstablishments);
  } catch (error) {
    return NextResponse.json(error);
  }
}

export async function POST(request: Request) {
  try {
    const db: Db = await connectToDatabase();

    const { name, category, street, number, neighborhood, city, state } = await request.json();

    const establishments = await db.collection('establishments').insertOne({
      name,
      category,
      street,
      number,
      neighborhood,
      city,
      state,
      createdAt: new Date(),
    });

    return NextResponse.json(
      {
        id: establishments.insertedId,
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
