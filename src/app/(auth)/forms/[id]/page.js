import { Alert } from '@/components/alert';
import { Form } from '@/components/form';
import Client from '@/lib/client';
import { RequestError } from '@/lib/request-error';

export const dynamic = 'force-dynamic';
export const metadata = {
  title: 'Form'
};

export default async function Page(props) {
  const { params } = props;
  const { id } = params;

  let form;
  try {
    form = await new Client().getForm(id);
  } catch (error) {
    if (error instanceof RequestError) {
      return <Alert type="failure">{error.message}</Alert>;
    }
  }

  return <Form form={form.data} {...props} />;
}
