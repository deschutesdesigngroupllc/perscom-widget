import * as Sentry from '@sentry/react'
import React, { useState } from 'react'
import useQuery from '../api/APIUtils'
import { Error } from '../components/Error'
import { Loading } from '../components/Loading'
import { config } from '../constants'
import { Calendar as CalendarComponent } from 'react-calendar'

function Calendar() {
  const [url] = useState(config.awards.API_URL)
  const [date, setDate] = useState(new Date())

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
          {data && !!data.length && renderCalendar(data, setDate, date)}
        </>
      )}
    </>
  )
}

function renderCalendar(data, setDate, date) {
  return <CalendarComponent onChange={setDate} value={date} selectRange={true} />
}

export default Sentry.withProfiler(Calendar)
