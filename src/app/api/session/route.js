import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { compressString, decompressString } from '../../../lib/gzip';
import { defaultSession, sessionOptions } from '../../../lib/session';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  const session = await getIronSession(cookies(), sessionOptions);

  const { perscomId = '', apiKey = '', returnTo = '/' } = await request.json();

  let compressedApiKey = '';
  if (apiKey) {
    compressedApiKey = await compressString(apiKey);
  }

  session.isLoggedIn = true;
  session.returnTo = returnTo;
  session.perscomId = perscomId;
  session.apiKey = compressedApiKey;

  await session.save();

  return Response.json(session);
}

export async function GET() {
  let session = await getIronSession(cookies(), sessionOptions);

  if (session.isLoggedIn !== true) {
    return Response.json(defaultSession);
  }

  let decompressedApiKey = '';
  if (session.apiKey) {
    decompressedApiKey = await decompressString(session.apiKey);
    session.apiKey = decompressedApiKey;
  }

  return Response.json(session);
}

export async function DELETE() {
  const session = await getIronSession(cookies(), sessionOptions);

  session.destroy();

  return Response.json(defaultSession);
}
