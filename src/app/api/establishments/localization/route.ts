import { NextResponse } from 'next/server';
import { Db, Collection } from 'mongodb';
import connectToDatabase from '@/app/api/utils/dbConnect';

// Tipos para os parâmetros da requisição
interface QueryParams {
  lat: string;
  lng: string;
  radius: string;
}

// Tipo para os estabelecimentos
interface Establishment {
  lat: string;
  lng: string;
  [key: string]: any; // Para incluir outras propriedades do estabelecimento
}

// Função para calcular a distância Haversine
function getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Raio da Terra em km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distância em km
  return d;
}

function deg2rad(deg: number): number {
  return deg * (Math.PI / 180);
}

connectToDatabase();

export async function GET(request: Request, { params }: any) {
  try {
    const url = new URL(request.url);
    const queryParams = url.searchParams;

    const lat = parseFloat(queryParams.get('lat') || '0');
    const lng = parseFloat(queryParams.get('lng') || '0');
    const radius = parseFloat(queryParams.get('radius') || '0');

    const db: Db = await connectToDatabase();

    const establishmentsCollection: Collection<Establishment> = db.collection('establishments');

    const establishments = await establishmentsCollection.find().toArray();

    const filteredEstablishments = establishments
      .map((establishment) => {
        const distance = getDistanceFromLatLonInKm(
          lat,
          lng,
          parseFloat(establishment.lat),
          parseFloat(establishment.lng)
        );
        return { ...establishment, distance };
      })
      .filter((establishment) => establishment.distance <= radius)
      .sort((a, b) => a.distance - b.distance);

    return NextResponse.json(filteredEstablishments);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
