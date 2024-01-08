'use client';

import useSession from '../hooks/use-session';

export function SessionProvider({ children }) {
  const { isLoading } = useSession();

  if (isLoading) {
    return <></>;
  }

  return <>{children}</>;
}
