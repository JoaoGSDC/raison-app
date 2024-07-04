import { NextResponse } from 'next/server';
import { Db } from 'mongodb';
import connectToDatabase from '../utils/dbConnect';
import admin from '../utils/firebaseAdmin';

connectToDatabase();

export async function GET(_: any) {
  try {
    const db: Db = await connectToDatabase();

    const feedbacks = await db
      .collection('feedbacks')
      .find()
      .sort({
        createdAt: -1,
      })
      .toArray();
    return NextResponse.json(feedbacks);
  } catch (error) {
    return NextResponse.json(error);
  }
}

export async function POST(request: Request) {
  try {
    const db: Db = await connectToDatabase();

    const authHeader = request.headers.get('Authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    const decodedToken = await admin.auth().verifyIdToken(token);
    const email = decodedToken.email;

    const {
      picture,
      userVisitDate,
      category,
      consumed,
      averageCost,
      evaluations,
      pros,
      cons,
      observation,
      establishment,
    } = await request.json();

    let respEstablishment: any = {};
    console.log('EC: ', {
      category: establishment.category,
    });

    // console.log('ID: ', establishment._id);

    if (establishment._id === '0') {
      const ec = {
        ...establishment,
        categories: establishment.category ? [...establishment.category, category] : [category],
        email: '',
        createdAt: new Date(),
      };

      delete ec.category;

      respEstablishment = await db.collection('establishments').insertOne(ec);
    }

    console.log({
      picture,
      userVisitDate,
      consumed,
      averageCost,
      evaluations,
      pros,
      cons,
      observation,
      establishment: respEstablishment.insertedId,
      user: email,
      likes: [],
      createdAt: new Date(),
    });

    const feedbacks = await db.collection('feedbacks').insertOne({
      picture,
      userVisitDate,
      consumed,
      averageCost,
      evaluations,
      pros,
      cons,
      observation,
      establishment: respEstablishment.insertedId,
      user: email,
      likes: [],
      createdAt: new Date(),
    });

    return NextResponse.json(
      {
        id: feedbacks.insertedId,
        picture,
        userVisitDate,
        consumed,
        averageCost,
        evaluations,
        pros,
        cons,
        observation,
        establishment,
        user: email,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(error);
  }
}
