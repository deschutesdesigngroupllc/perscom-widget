import { getIronSession } from 'iron-session';
import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { sessionOptions } from '../lib/session';

export async function getSession(shouldSleep = true) {
  return await getIronSession(cookies(), sessionOptions);
}

export default async function AuthWrapper(props) {
  const session = await getSession();

  if (!session.isLoggedIn && !headers().has('x-perscom-apikey')) {
    return redirect('/');
  }

  return <>{props.children}</>;
}
