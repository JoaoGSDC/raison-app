import { NextResponse } from 'next/server';
import { Db, ObjectId } from 'mongodb';
import connectToDatabase from '../../utils/dbConnect';

connectToDatabase();

export async function GET(_: any, { params }: { params: { id: string } }) {
  try {
    const db: Db = await connectToDatabase();

    const { id } = params;

    const feedback = await db.collection('feedbacks').findOne({ _id: new ObjectId(id) });

    return NextResponse.json(feedback);
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
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const db: Db = await connectToDatabase();

    const { id } = params;
    const { picture, userVisitDate, consumed, averageCost, evaluations, pros, cons, observation, establishment, user } =
      await request.json();

    const checkedFields = validateRequiredFields(
      { userVisitDate, consumed, averageCost, evaluations, pros, cons, establishment, user },
      REQUIRED_FIELDS
    );

    if (checkedFields.hasError) {
      return NextResponse.json({ error: checkedFields.requireds }, { status: 400 });
    }

    await db.collection('feedbacks').updateOne(
      { _id: new ObjectId(id) },
      {
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
      }
    );

    return NextResponse.json(
      {
        id,
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

export async function DELETE(_: any, { params }: { params: { id: string } }) {
  try {
    const db: Db = await connectToDatabase();

    const { id } = params;

    await db.collection('feedbacks').deleteOne({ _id: new ObjectId(id) });

    return NextResponse.json({ message: `Feedback deletado com sucesso!` }, { status: 200 });
  } catch (error) {
    return NextResponse.json(error);
  }
}
