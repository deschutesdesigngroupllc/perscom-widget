'use client';

import { TextInput } from 'flowbite-react';
import useSession from '../hooks/use-session';
import { Submit } from './submit';

export default function Login() {
  const { session, update } = useSession();

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const perscomId = formData.get('perscomId');
    const apiKey = formData.get('apiKey');

    if (perscomId && apiKey) {
      update(
        { perscomId, apiKey },
        {
          optimisticData: {
            isLoggedIn: true
          }
        }
      );
    }
  };

  if (session.isLoggedIn) {
    return <></>;
  }

  return (
    <form onSubmit={handleSubmit} method="POST" className="grid grid-cols-1 gap-6 sm:grid-cols-6">
      <div className="col-span-full sm:col-span-2">
        <TextInput type="number" name="perscomId" id="perscomId" placeholder="PERSCOM ID" />
      </div>
      <div className="col-span-full sm:col-span-4">
        <TextInput
          type="password"
          name="apiKey"
          id="apiKey"
          autoComplete="new-password"
          placeholder="API Key"
        />
      </div>
      <div className="col-span-full">
        <Submit className="w-full">Log in</Submit>
      </div>
    </form>
  );
}
