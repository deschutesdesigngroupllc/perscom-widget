import { Alert } from '../../../components/alert';
import Client from '../../../lib/client';
import { RequestError } from '../../../lib/request-error';
import { Calendar } from './_components/calendar';

export const dynamic = 'force-dynamic';
export const metadata = {
  title: 'Calendar'
};

export default async function Page() {
  let events = {};
  try {
    events = await new Client().getEvents();
  } catch (error) {
    if (error instanceof RequestError) {
      return <Alert type="failure">{error.message}</Alert>;
    }
  }

  return <Calendar events={events} />;
}
