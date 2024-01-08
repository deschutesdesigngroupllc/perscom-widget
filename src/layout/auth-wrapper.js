'use client';

import { useRouter } from 'next/navigation';
import useSession from '../hooks/use-session';

export default function AuthWrapper(props) {
  const router = useRouter();
  const { session } = useSession();

  if (!session.isLoggedIn) {
    return router.push('/');
  }

  return <>{props.children}</>;
}
