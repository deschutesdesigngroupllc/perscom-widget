import { defaultSession } from '@/lib/session';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

const sessionApiRoute = '/api/session';

async function fetchJson(url, init) {
  return fetch(url, {
    headers: {
      accept: 'application/json',
      'content-type': 'application/json'
    },
    ...init
  }).then((r) => r.json());
}

function doUpdateSession(url, arg) {
  return fetchJson(url, {
    method: 'POST',
    body: JSON.stringify(arg.arg)
  });
}

function doDestroySession(url) {
  return fetchJson(url, {
    method: 'DELETE'
  });
}

export default function useSession() {
  const { data: session, isLoading } = useSWR(sessionApiRoute, fetchJson, {
    fallbackData: defaultSession
  });

  const { trigger: update } = useSWRMutation(sessionApiRoute, doUpdateSession, {
    revalidate: false
  });
  const { trigger: destroy } = useSWRMutation(sessionApiRoute, doDestroySession, {
    optimisticData: defaultSession
  });

  return { session, destroy, update, isLoading };
}
