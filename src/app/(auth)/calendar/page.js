import Auth from '../../../lib/auth';
import Client from '../../../lib/client';
import { Calendar } from './_components/calendar';

export const dynamic = 'force-dynamic';
export const metadata = {
  title: 'Calendar'
};

export default async function Page({ searchParams }) {
  const events = await new Client(new Auth(searchParams)).getEvents();

  return <Calendar events={events} />;
}
