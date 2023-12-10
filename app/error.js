'use client';

import { Alert } from '../components/alert';

export default function Error({ error, reset }) {
  return <Alert message={error.message} type="failure" />;
}
