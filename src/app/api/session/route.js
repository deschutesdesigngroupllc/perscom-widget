import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { defaultSession, sessionOptions } from '../../../lib/session';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  const session = await getIronSession(cookies(), sessionOptions);

  const { perscomId = '', apiKey = '', returnTo = '/' } = await request.json();

  session.isLoggedIn = true;
  session.returnTo = returnTo;
  session.perscomId = perscomId;
  session.apiKey = apiKey;

  await session.save();

  return Response.json(session);
}

export async function GET() {
  const session = await getIronSession(cookies(), sessionOptions);

  if (session.isLoggedIn !== true) {
    return Response.json(defaultSession);
  }

  return Response.json(session);
}

export async function DELETE() {
  const session = await getIronSession(cookies(), sessionOptions);

  session.destroy();

  return Response.json(defaultSession);
}
