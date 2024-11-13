'use client';

import useSession from '@/hooks/use-session';
import { Button } from './button';

export default function Logout() {
  const { session, destroy } = useSession();

  const handleSubmit = (event) => {
    event.preventDefault();

    destroy(null);
  };

  if (!session.isLoggedIn) {
    return <></>;
  }

  return <Button onClick={handleSubmit}>Log out</Button>;
}
