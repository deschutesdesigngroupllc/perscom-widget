'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import useSession from '../hooks/use-session';

export function SessionProvider({ children }) {
  const { isLoading, update } = useSession();
  const router = useRouter();
  const returnTo = usePathname();
  const searchParams = useSearchParams();
  const perscomId = searchParams.get('perscomid');
  const apiKey = searchParams.get('apikey');

  useEffect(() => {
    if (perscomId && apiKey) {
      update(
        { perscomId, apiKey, returnTo },
        {
          optimisticData: {
            isLoggedIn: true
          }
        }
      );

      router.push(returnTo);
    }
  }, [apiKey, perscomId]);

  if (isLoading) {
    return <></>;
  }

  return <>{children}</>;
}
