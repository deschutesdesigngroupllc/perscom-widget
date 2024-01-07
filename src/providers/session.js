'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export function SessionProvider({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [getPathname, setPathname] = useState(pathname);
  const perscomId = searchParams.get('perscomid');
  const apiKey = searchParams.get('apikey');

  useEffect(() => {
    if (perscomId && apiKey) {
      setPathname(pathname);

      fetch('/api/session', {
        method: 'POST',
        body: JSON.stringify({ perscomId, apiKey }),
        cache: 'no-store'
      }).finally(() => router.push(getPathname));
    } else {
      setIsLoading(false);
    }
  }, [apiKey, perscomId]);

  if (isLoading) {
    return <></>;
  }

  return <>{children}</>;
}
