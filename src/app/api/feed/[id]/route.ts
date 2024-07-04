import { NextRequest, NextResponse } from 'next/server';
import { Db, ObjectId } from 'mongodb';
import connectToDatabase from '../../utils/dbConnect';
import admin from '../../utils/firebaseAdmin';

connectToDatabase();

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const db: Db = await connectToDatabase();

    const authHeader = request.headers.get('Authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    const decodedToken = await admin.auth().verifyIdToken(token);
    const email = decodedToken.email;

    const { id } = params;
    const feedbackId = new ObjectId(id);

    const feedback = await db.collection('feedbacks').findOne({ _id: feedbackId });
    if (!feedback) {
      return NextResponse.json({ error: 'Feedback not found' }, { status: 404 });
    }

    const feedbackUser = await db.collection('users').findOne({ email: feedback.user });
    const establishment = await db
      .collection('establishments')
      .findOne({ _id: new ObjectId(feedback.establishment._id) });

    const feedbackWithDetails = {
      ...feedback,
      username: feedbackUser?.username,
      establishment,
      userPicture: feedbackUser?.picture,
      isLiked: feedback.likes && feedback.likes.includes(email),
    };

    return NextResponse.json(feedbackWithDetails);
  } catch (error) {
    console.error('Error fetching feedback:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const db: Db = await connectToDatabase();

    const { id } = params;
    const authHeader = request.headers.get('Authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    const decodedToken = await admin.auth().verifyIdToken(token);
    const email = decodedToken.email;

    const feedback = await db.collection('feedbacks').findOne({ _id: new ObjectId(id) });

    if (!feedback) {
      return NextResponse.json({ error: 'Feedback not found' }, { status: 404 });
    }

    let likes = feedback.likes || [];

    if (likes.includes(email)) {
      likes = likes.filter((likeEmail: string) => likeEmail !== email);
    } else {
      likes.push(email);
    }

    await db.collection('feedbacks').updateOne(
      { _id: new ObjectId(id) },
      {
        $set: { likes },
      }
    );

    return NextResponse.json(
      {
        id,
        likes,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating likes:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const db: Db = await connectToDatabase();

    const authHeader = request.headers.get('Authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    const decodedToken = await admin.auth().verifyIdToken(token);
    const email = decodedToken.email;

    const { id } = params;
    const feedbackId = new ObjectId(id);

    const feedback = await db.collection('feedbacks').findOne({ _id: feedbackId });
    if (!feedback) {
      return NextResponse.json({ error: 'Feedback not found' }, { status: 404 });
    }

    if (feedback.user !== email) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    await db.collection('feedbacks').deleteOne({ _id: feedbackId });

    return NextResponse.json({ message: 'Feedback deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting feedback:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
