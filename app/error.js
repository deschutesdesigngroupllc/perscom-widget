'use client';

import { RequestError } from '../lib/errors/requestError';
import { Alert } from '../components/alert';

export default function Error({ error, reset }) {
  if (error instanceof RequestError) {
    return <Alert message={`${error.status}: ${error.message}`} type="failure" />;
  }

  return <Alert message={error.message} type="failure" />;
}
