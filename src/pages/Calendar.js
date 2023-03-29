import * as Sentry from '@sentry/react'
import React, { useState } from 'react'
import useQuery from '../api/APIUtils'
import { Error } from '../components/Error'
import { Loading } from '../components/Loading'
import { config } from '../constants'
import { Calendar as CalendarComponent } from '../components/Calendar'

function Calendar() {
  const [url] = useState(config.calendars.API_URL)

  const { data, loading, error } = useQuery({
    url: url,
    queryParams: {
      key: 'include',
      value: 'image'
    }
  })

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {error && <Error error={error} />}
          {data && !!data.length && renderCalendar(data)}
        </>
      )}
    </>
  )
}

function renderCalendar() {
  return <CalendarComponent />
}

export default Sentry.withProfiler(Calendar)
