import { ChevronLeftIcon } from '@heroicons/react/20/solid';
import { Alert } from '../../../../components/alert';
import { Form } from '../../../../components/form';
import { Link } from '../../../../components/link';
import { RequestError } from '../../../../lib/request-error';

export const dynamic = 'force-dynamic';
export const metadata = {
  title: 'Form'
};

export default async function Page({ params }) {
  const { id } = params;

  let form = {};
  try {
    form = await new Client().getForm(id);
  } catch (error) {
    if (error instanceof RequestError) {
      return <Alert type="failure">{error.message}</Alert>;
    }
  }

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
