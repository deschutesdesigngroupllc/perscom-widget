'use client';

import { TextInput } from 'flowbite-react';
import useSession from '../hooks/use-session';
import { Submit } from './submit';

export default function Login() {
  const { session, update } = useSession();

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const apiKey = formData.get('apiKey');

    if (apiKey) {
      update(
        { apiKey },
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
      <div className="col-span-full">
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
