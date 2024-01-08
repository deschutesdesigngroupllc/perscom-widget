'use client';

import * as Sentry from '@sentry/nextjs';
import { useEffect } from 'react';
import { Alert } from '../components/alert';
import { RequestError } from '../lib/request-error';

export default function Error({ error, reset }) {
  useEffect(() => {
    Sentry.captureException(error);
  });

  if (error instanceof RequestError) {
    return <Alert type="failure">{`${error.status}: ${error.message}`}</Alert>;
  }

  return <Alert type="failure">{error.message}</Alert>;
}
