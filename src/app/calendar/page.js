import Auth from '../../api/auth';
import Client from '../../api/client';
import { Calendar } from './_components/calendar';

export const dynamic = 'force-dynamic';
export const metadata = {
  title: 'Calendar'
};

export default async function Page({ searchParams }) {
  const events = await new Client(new Auth(searchParams)).getEvents();

  return <Calendar events={events} />;
}
