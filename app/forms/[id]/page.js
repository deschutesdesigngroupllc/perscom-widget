import Auth from '../../../api/auth';
import Client from '../../../api/client';
import Link from 'next/link';
import { ChevronLeftIcon } from '@heroicons/react/20/solid';
import { Form } from '../../../components/form';

export default async function Page({ searchParams, params }) {
  const { id } = params;
  const auth = new Auth(searchParams);
  const formData = await new Client(auth).getForm(id);
  const form = formData.data;

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-row items-center justify-start space-x-1 active:text-blue-600">
        <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
        <Link href={'/forms'} className="text-sm">
          Back to Forms
        </Link>
      </div>
      <Form form={form} />
    </div>
  );
}
