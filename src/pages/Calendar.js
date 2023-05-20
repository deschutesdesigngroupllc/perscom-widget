import * as Sentry from '@sentry/react'
import React, { useEffect, useState } from 'react'
import useQuery from '../api/APIUtils'
import { Loading } from '../components/Loading'
import { config } from '../constants'
import dayjs from 'dayjs'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import rrulePlugin from '@fullcalendar/rrule'
import listPlugin from '@fullcalendar/list'
import '../assets/css/calendar.css'
import { useSearchParams } from 'react-router-dom'
import { Alert } from '../components/Alert'

function Calendar() {
  var utc = require('dayjs/plugin/utc')
  var timezone = require('dayjs/plugin/timezone')
  dayjs.extend(utc)
  dayjs.extend(timezone)

  const [url] = useState(config.events.API_URL)
  const [eventData, setEventData] = useState([])
  const [searchParams] = useSearchParams()

  const { data, loading, error } = useQuery({
    url: url,
    queryParams: {
      key: 'include',
      value: 'calendar'
    }
  })

  const timezoneParameter = searchParams.get('timezone') ?? config.app.TIMEZONE ?? 'UTC'

  const mapEventData = () => {
    const mappedEventData = data?.map((event) => {
      return {
        id: event.id,
        title: event.name,
        allDay: event.all_day,
        start: dayjs(event.start).tz(timezoneParameter).toDate(),
        end: dayjs(event.end).tz(timezoneParameter).toDate(),
        description: event.description,
        rrule: event.rrule,
        color: event.calendar?.color ?? '#2563eb',
        backgroundColor: event.calendar?.color ?? '#2563eb'
      }
    })

    setEventData(mappedEventData)
  }

  useEffect(() => {
    mapEventData()
  }, [data])

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {error ? (
            <Alert message={error} type='danger' />
          ) : (
            data && (
              <FullCalendar
                plugins={[dayGridPlugin, rrulePlugin, listPlugin]}
                handleWindowResize={true}
                events={eventData}
                timeZone={timezoneParameter}
                //height='1400'
                displayEventEnd={true}
                buttonText={{
                  today: 'Today'
                }}
              />
            )
          )}
        </>
      )}
    </>
  )
}

export default Sentry.withProfiler(Calendar)
