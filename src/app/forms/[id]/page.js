import { ChevronLeftIcon } from '@heroicons/react/20/solid';
import Auth from '../../../api/auth';
import Client from '../../../api/client';
import { Form } from '../../../components/form';
import { Link } from '../../../components/link';

export const dynamic = 'force-dynamic';
export const metadata = {
  title: 'Form'
};

export default async function Page(props) {
  const { searchParams, params } = props;
  const { id } = params;
  const client = new Client(new Auth(searchParams));
  const form = await client.getForm(id);

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-row items-center justify-start space-x-1 active:text-blue-600">
        <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
        <Link href={'/forms'} className="text-sm">
          Back to Forms
        </Link>
      </div>
      <Form form={form.data} {...props} />
    </div>
  );
}
