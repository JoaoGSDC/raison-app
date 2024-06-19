import { NextRequest, NextResponse } from 'next/server';
import { Db, ObjectId } from 'mongodb';
import connectToDatabase from '../utils/dbConnect';
import admin from '../utils/firebaseAdmin';

connectToDatabase();

export async function GET(request: NextRequest) {
  try {
    const db: Db = await connectToDatabase();

    const authHeader = request.headers.get('Authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    const decodedToken = await admin.auth().verifyIdToken(token);
    const email = decodedToken.email;

    // Encontrar o usuário A e obter a lista de usuários que ele segue
    const user = await db.collection('users').findOne({ email });
    if (!user) {
      return NextResponse.json({ error: 'No following users found' }, { status: 404 });
    }

    const following = user.following; // assumindo que 'following' é um array de emails

    // Buscar feedbacks dos usuários que o usuário A segue
    const feedbacks = await db
      .collection('feedbacks')
      .find({ $or: [{ user: { $in: following } }, { user: email }] })
      .sort({ createdAt: -1 })
      .toArray();

    // Adicionar informações adicionais: userPicture e isLiked
    const feedbacksWithDetails = await Promise.all(
      feedbacks.map(async (feedback) => {
        const feedbackUser = await db.collection('users').findOne({ email: feedback.user });
        const establishment = await db
          .collection('establishments')
          .findOne({ _id: new ObjectId(feedback.establishment._id) });

        return {
          ...feedback,
          username: feedbackUser?.username,
          establishment,
          userPicture: feedbackUser?.picture,
          isLiked: feedback.likes && feedback.likes.includes(email), // Verifica se o usuário atual curtiu o feedback
        };
      })
    );

    return NextResponse.json(feedbacksWithDetails);
  } catch (error) {
    console.error('Error fetching feedback:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
