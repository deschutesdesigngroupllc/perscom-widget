import * as Sentry from '@sentry/nextjs';
import { config } from './lib/constants';

Sentry.init({
  dsn: config.sentry.SENTRY_DSN,
  integrations: [new Sentry.Replay()],
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0
});
