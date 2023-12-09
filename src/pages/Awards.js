import * as Sentry from '@sentry/react'
import React, { Suspense } from 'react'
import { AwardsList } from '../components/AwardsList'
import { Loading } from '../components/Loading'
import { ErrorBoundary } from 'react-error-boundary'
import { Alert } from '../components/Alert'

const Awards = () => {
  return (
    <ErrorBoundary fallback={<Alert type='failure' message='There was an error while loading the awards.' />}>
      <Suspense fallback={<Loading />}>
        <AwardsList />
      </Suspense>
    </ErrorBoundary>
  )
}

export default Sentry.withProfiler(Awards)
