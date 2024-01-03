'use client';

import cx from 'classnames';
import dayjs from 'dayjs';
import timezonePlugin from 'dayjs/plugin/timezone';
import utcPlugin from 'dayjs/plugin/utc';
import { useSearchParams } from 'next/navigation';
import { Fragment, useEffect, useState } from 'react';
import { rrulestr } from 'rrule';

export function Days({ currentMonth, handleDayEventSelect, events }) {
  const searchParams = useSearchParams();

  dayjs.extend(utcPlugin);
  dayjs.extend(timezonePlugin);
  dayjs.tz.setDefault(searchParams.get('timezone') ?? 'UTC');

  const [arrayOfWeeks, setArrayOfWeeks] = useState([]);
  const [selectedDay, setSelectedDay] = useState({});

  const handleDaySelect = (day, event, openModal) => {
    setSelectedDay(day);
    handleDayEventSelect(day, event, openModal);
  };

  const formatDateObject = (date) => {
    const clonedObject = { ...date.toObject() };

    return {
      date: date.format('YYYY-MM-DD'),
      day: clonedObject.date,
      month: clonedObject.months,
      year: clonedObject.years,
      isCurrentMonth: clonedObject.months === currentMonth.month(),
      isCurrentDay: date.isToday()
    };
  };

  const formatEvent = (event) => {
    return {
      id: event.id,
      name: event.name,
      description: event.description,
      start: dayjs(event.start).tz(searchParams.get('timezone') ?? 'UTC'),
      end: dayjs(event.start)
        .tz(searchParams.get('timezone') ?? 'UTC')
        .isSame(dayjs(event.end), 'day')
        ? dayjs(event.end)
        : null,
      color: event?.calendar?.color,
      allDay: event.all_day,
      repeats: event.repeats,
      rrule: event.repeats ? rrulestr(event.rrule) : null,
      calendar: event.calendar?.name,
      location: event.location,
      details: event.content
    };
  };

  const getAllDays = () => {
    const parsedSingleEvents =
      events.data &&
      events.data.filter((event) => !event.repeats).map((event) => formatEvent(event));
    const parsedRepeatingEvents =
      events.data &&
      events.data
        .filter((event) => event.repeats && event.rrule)
        .map((event) => formatEvent(event));

    let parsedEvents = parsedSingleEvents;
    let currentDate = currentMonth
      .startOf('month')
      .weekday(0)
      .tz(searchParams.get('timezone') ?? 'UTC');
    const nextMonth = currentMonth.add(1, 'month').month();

    parsedRepeatingEvents.forEach(function (event) {
      parsedEvents.push(
        ...event.rrule
          .between(currentDate.toDate(), currentDate.add(45, 'day').toDate())
          .map(function (occurrence) {
            return { ...event, start: dayjs(occurrence) };
          })
      );
    });

    let allDates = [];
    let weekDates = [];
    let weekCounter = 1;

    while (currentDate.weekday(0).toObject().months !== nextMonth) {
      const formatted = formatDateObject(currentDate);
      formatted['events'] = parsedEvents.filter(function (event) {
        return currentDate.isSame(dayjs(event.start), 'day');
      });

      weekDates.push(formatted);

      if (weekCounter === 7) {
        allDates.push({ dates: weekDates });
        weekDates = [];
        weekCounter = 0;
      }

      weekCounter++;
      currentDate = currentDate.add(1, 'day');
    }

    setArrayOfWeeks(allDates);
  };

  useEffect(() => {
    getAllDays();
  }, [currentMonth]);

  return (
    <div className="flex rounded-b-lg bg-gray-200 text-xs leading-6 dark:bg-gray-700 lg:flex-auto">
      <div
        className={cx('hidden w-full lg:grid lg:grid-cols-7 lg:gap-px', {
          'lg:grid-rows-5': arrayOfWeeks.length === 5,
          'lg:grid-rows-6': arrayOfWeeks.length === 6,
          'lg:grid-rows-7': arrayOfWeeks.length === 7
        })}
      >
        {arrayOfWeeks &&
          !!arrayOfWeeks.length &&
          arrayOfWeeks.map((week, weekIndex) => (
            <Fragment key={weekIndex}>
              {week.dates &&
                !!week.dates.length &&
                week.dates.map((day, dayIndex) => (
                  <div
                    key={dayIndex}
                    className={cx('relative min-h-40 px-3 py-2', {
                      'bg-white dark:bg-gray-800': day.isCurrentMonth,
                      'bg-gray-50 dark:bg-gray-700': !day.isCurrentMonth,
                      'rounded-bl-lg': dayIndex === 0 && weekIndex === arrayOfWeeks.length - 1,
                      'rounded-br-lg':
                        dayIndex === week.dates.length - 1 && weekIndex === arrayOfWeeks.length - 1
                    })}
                  >
                    <time
                      dateTime={day.date}
                      className={cx({
                        'flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 font-semibold text-white':
                          day.isCurrentDay
                      })}
                    >
                      {day.day}
                    </time>
                    {day.events && !!day.events.length && (
                      <ol className="mt-2">
                        {day.events.map((event) => (
                          <li key={event.id}>
                            <button
                              onClick={() => handleDaySelect(day, event, true)}
                              className="group my-1 flex w-full cursor-pointer items-center justify-between rounded px-2 shadow hover:opacity-90 focus-visible:outline-none"
                              style={{
                                backgroundColor: event.color
                              }}
                            >
                              <p className="truncate font-medium text-white group-hover:text-gray-200">
                                {event.name}
                              </p>
                              {!event.allDay && (
                                <>
                                  <time
                                    dateTime={event.start.format('YYYY-MM-DD HH:mm')}
                                    className="ml-3 hidden flex-none text-white group-hover:text-gray-200 xl:block"
                                  >
                                    {event.start.format('h:mm A')}
                                  </time>
                                </>
                              )}
                            </button>
                          </li>
                        ))}
                      </ol>
                    )}
                  </div>
                ))}
            </Fragment>
          ))}
      </div>
      <div
        className={cx('isolate grid w-full grid-cols-7 gap-px lg:hidden', {
          'grid-rows-5': arrayOfWeeks.length === 5,
          'grid-rows-6': arrayOfWeeks.length === 6,
          'grid-rows-7': arrayOfWeeks.length === 7
        })}
      >
        {arrayOfWeeks &&
          !!arrayOfWeeks.length &&
          arrayOfWeeks.map((week, weekIndex) => (
            <Fragment key={weekIndex}>
              {week.dates.map((day, dayIndex) => (
                <button
                  key={dayIndex}
                  type="button"
                  className={cx(
                    'flex h-14 flex-col px-3 py-2 hover:bg-gray-100 focus:z-10 focus-visible:outline-none dark:hover:bg-gray-900',
                    {
                      'bg-white dark:bg-gray-800': day.isCurrentMonth,
                      'bg-gray-50 dark:bg-gray-700': !day.isCurrentMonth,
                      'font-semibold': day.isSelected || day.isCurrentDay,
                      'text-white': day.isSelected,
                      'text-blue-600': !day.isSelected && day.isCurrentDay,
                      'rounded-bl-md':
                        dayIndex === 0 &&
                        weekIndex === arrayOfWeeks.length - 1 &&
                        !selectedDay?.events?.length,
                      'rounded-br-md':
                        dayIndex === week.dates.length - 1 &&
                        weekIndex === arrayOfWeeks.length - 1 &&
                        !selectedDay?.events?.length
                    }
                  )}
                  onClick={() => handleDaySelect(day, {}, false)}
                >
                  <time
                    dateTime={day.date}
                    className={cx('ml-auto', {
                      'flex h-6 w-6 items-center justify-center rounded-full': day.isSelected,
                      'bg-blue-600': day.isSelected && day.isCurrentDay,
                      'bg-gray-900': day.isSelected && !day.isCurrentDay
                    })}
                  >
                    {day.day}
                  </time>
                  {day.events && day.events.length > 0 && (
                    <>
                      <span className="sr-only">{day.events.length} events</span>
                      <span className="-mx-0.5 mt-auto flex flex-wrap-reverse">
                        {day.events.map((event) => (
                          <span
                            key={event.id}
                            className="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-gray-400"
                          />
                        ))}
                      </span>
                    </>
                  )}
                </button>
              ))}
            </Fragment>
          ))}
      </div>
    </div>
  );
}
