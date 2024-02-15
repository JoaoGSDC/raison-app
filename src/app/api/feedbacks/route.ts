import { NextResponse } from 'next/server';
import { Db } from 'mongodb';
import connectToDatabase from '../utils/dbConnect';

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

const REQUIRED_FIELDS = [
  'userVisitDate',
  'consumed',
  'averageCost',
  'evaluations',
  'pros',
  'cons',
  'establishment',
  'user',
];
export async function POST(request: Request) {
  try {
    const db: Db = await connectToDatabase();

    const { picture, userVisitDate, consumed, averageCost, evaluations, pros, cons, observation, establishment, user } =
      await request.json();

    const checkedFields = validateRequiredFields(
      { userVisitDate, consumed, averageCost, evaluations, pros, cons, establishment, user },
      REQUIRED_FIELDS
    );

    if (checkedFields.hasError) {
      return NextResponse.json({ error: checkedFields.requireds }, { status: 400 });
    }

    const feedbacks = await db.collection('feedbacks').insertOne({
      picture,
      userVisitDate,
      consumed,
      averageCost,
      evaluations,
      pros,
      cons,
      observation,
      establishment,
      user,
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
        user,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(error);
  }
}
