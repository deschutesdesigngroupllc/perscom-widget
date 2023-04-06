import * as Sentry from '@sentry/react'
import React, { useEffect, useState } from 'react'
import useQuery from '../api/APIUtils'
import { Error } from '../components/Error'
import { Loading } from '../components/Loading'
import { config } from '../constants'
import dayjs from 'dayjs'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import rrulePlugin from '@fullcalendar/rrule'
import listPlugin from '@fullcalendar/list'
import '../assets/css/calendar.css'

function Calendar() {
  const [url] = useState(config.events.API_URL)
  const [eventData, setEventData] = useState([])

  const { data, loading, error } = useQuery({
    url: url,
    queryParams: {
      key: 'include',
      value: 'calendar'
    }
  })

  const mapEventData = () => {
    const mappedEventData = data?.map((event) => {
      return {
        id: event.id,
        title: event.name,
        allDay: event.all_day,
        start: dayjs(event.start).toDate(),
        end: dayjs(event.end).toDate(),
        description: event.description,
        rrule: event.rrule,
        color: event.calendar?.color ?? '#2563eb',
        backgroundColor: event.calendar?.color ?? '#2563eb'
      }
    })

    setEventData(mappedEventData)
  }

  const goToEvent = (event) => {
    window.alert(event)
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
          {error && <Error error={error} />}
          {data && !!data.length && (
            <FullCalendar
              plugins={[dayGridPlugin, rrulePlugin, listPlugin]}
              handleWindowResize={true}
              events={eventData}
              timeZone='UTC'
              displayEventEnd={true}
              eventClick={goToEvent}
              buttonText={{
                today: 'Today'
              }}
            />
          )}
        </>
      )}
    </>
  )
}

export default Sentry.withProfiler(Calendar)
