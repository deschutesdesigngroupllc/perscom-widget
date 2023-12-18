import { Calendar } from './_components/calendar';
import Client from '../../api/client';
import Auth from '../../api/auth';

export const dynamic = 'force-dynamic';
export const metadata = {
  title: 'Calendar'
};

export default async function Page({ searchParams }) {
  const events = await new Client(new Auth(searchParams)).getEvents();

  return <Calendar events={events} />;
}
