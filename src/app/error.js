'use client';

import * as Sentry from '@sentry/nextjs';
import { useEffect } from 'react';
import { Alert } from '../components/alert';
import { RequestError } from '../lib/errors/requestError';

export default function Error({ error, reset }) {
  useEffect(() => {
    Sentry.captureException(error);
  });

  if (error instanceof RequestError) {
    return <Alert message={`${error.status}: ${error.message}`} type="failure" />;
  }

  return <Alert message={error.message} type="failure" />;
}
