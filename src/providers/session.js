'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import useSession from '../hooks/use-session';

export function SessionProvider({ children }) {
  const { isLoading, update } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const perscomId = searchParams.get('perscomid');
  const apiKey = searchParams.get('apikey');

  useEffect(() => {
    if (perscomId || apiKey) {
      const forwardedParams = new URLSearchParams(searchParams);
      forwardedParams.delete('apikey');
      forwardedParams.delete('perscomid');

      const returnToWithParams = `${pathname}?${forwardedParams.toString()}`;

      update(
        { perscomId, apiKey, returnTo: returnToWithParams },
        {
          optimisticData: {
            isLoggedIn: true
          }
        }
      );

      router.push(returnToWithParams);
    }
  }, [apiKey, perscomId, pathname, router, update]);

  if (isLoading || searchParams.has('perscomid') || searchParams.has('apikey')) {
    return <></>;
  }

  return <>{children}</>;
}
