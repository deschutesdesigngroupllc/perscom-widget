import React, { useState, useEffect } from 'react'
import { Fragment } from 'react'
import { ChevronLeftIcon, ChevronRightIcon, ClockIcon, EllipsisHorizontalIcon } from '@heroicons/react/20/solid'
import { Menu, Transition } from '@headlessui/react'
import dayjs from 'dayjs'
import weekdayPlugin from 'dayjs/plugin/weekday'
import objectPlugin from 'dayjs/plugin/toObject'
import isTodayPlugin from 'dayjs/plugin/isToday'
import cx from 'classnames'

export function Calendar() {
  const now = dayjs()
  dayjs.extend(weekdayPlugin)
  dayjs.extend(objectPlugin)
  dayjs.extend(isTodayPlugin)

  const [selectedDay, setSelectedDay] = useState({})
  const [currentMonth, setCurrentMonth] = useState(now)
  const [arrayOfWeeks, setArrayOfWeeks] = useState([])

  const goToPreviousMonth = () => {
    const minus = currentMonth.subtract(1, 'month')
    setCurrentMonth(minus)
  }

  const goToToday = () => {
    setCurrentMonth(now)
  }

  const goToNextMonth = () => {
    const plus = currentMonth.add(1, 'month')
    setCurrentMonth(plus)
  }

  const getWeekDays = () => {
    const days = []

    for (let i = 0; i < 7; i++) {
      days.push(now.weekday(i))
    }

    return days
  }

  const calculateDays = () => {
    let currentDate = currentMonth.startOf('month').weekday(0)
    const nextMonth = currentMonth.add(1, 'month').month()
    let allDates = []
    let weekDates = []
    let weekCounter = 1

    while (currentDate.weekday(0).toObject().months !== nextMonth) {
      const formated = formatDateObject(currentDate)
      weekDates.push(formated)

      if (weekCounter === 7) {
        allDates.push({ dates: weekDates })
        weekDates = []
        weekCounter = 0
      }

      weekCounter++
      currentDate = currentDate.add(1, 'day')
    }
    setArrayOfWeeks(allDates)
  }

  const formatDateObject = (date) => {
    const clonedObject = { ...date.toObject() }
    const formatedObject = {
      day: clonedObject.date,
      month: clonedObject.months,
      year: clonedObject.years,
      datetime: date.format('YYYY-MM-DD'),
      isCurrentMonth: clonedObject.months === currentMonth.month(),
      isToday: date.isToday()
    }

    return formatedObject
  }

  useEffect(() => {
    calculateDays()
  }, [currentMonth])

  return (
    <div className='divide-y divide-gray-300 lg:flex lg:h-full lg:flex-col flex-grow overflow-hidden ring-1 ring-black ring-opacity-5 rounded-lg bg-white shadow min-h-full text-sm'>
      <header className='flex items-center justify-between px-6 py-4 lg:flex-none'>
        <h1 className='text-base font-semibold leading-6 text-gray-900'>
          <time dateTime={currentMonth.format('YYYY-MM')}>{currentMonth.format('MMMM YYYY')}</time>
        </h1>
        <div className='flex items-center'>
          <div className='relative flex items-center rounded-md bg-white shadow-sm md:items-stretch'>
            <div className='pointer-events-none absolute inset-0 rounded-md ring-1 ring-inset ring-gray-300' aria-hidden='true' />
            <button
              onClick={goToPreviousMonth}
              type='button'
              className='flex items-center justify-center rounded-l-md py-2 pl-3 pr-4 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:px-2 md:hover:bg-gray-50'
            >
              <span className='sr-only'>Previous month</span>
              <ChevronLeftIcon className='h-5 w-5' aria-hidden='true' />
            </button>
            <button
              onClick={goToToday}
              type='button'
              className='hidden px-3.5 text-sm font-semibold text-gray-900 hover:bg-gray-50 focus:relative md:block'
            >
              Today
            </button>
            <span className='relative -mx-px h-5 w-px bg-gray-300 md:hidden' />
            <button
              onClick={goToNextMonth}
              type='button'
              className='flex items-center justify-center rounded-r-md py-2 pl-4 pr-3 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:px-2 md:hover:bg-gray-50'
            >
              <span className='sr-only'>Next month</span>
              <ChevronRightIcon className='h-5 w-5' aria-hidden='true' />
            </button>
          </div>
          <div className='hidden md:flex md:items-center'>
            <div className='ml-6 h-6 w-px bg-gray-300' />
            <button
              type='button'
              className='ml-6 rounded-md  bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
            >
              Add event
            </button>
          </div>
          <Menu as='div' className='relative ml-6 md:hidden'>
            <Menu.Button className='-mx-2 flex items-center round ed-full border border-transparent p-2 text-gray-400 hover:text-gray-500'>
              <span className='sr-only'>Open menu</span>
              <EllipsisHorizontalIcon className='h-5 w-5' aria-hidden='true' />
            </Menu.Button>

            <Transition
              as={Fragment}
              enter='transition ease-out duration-100'
              enterFrom='transform opacity-0 scale-95'
              enterTo='transform opacity-100 scale-100'
              leave='transition ease-in duration-75'
              leaveFrom='transform opacity-100 scale-100'
              leaveTo='transform opacity-0 scale-95'
            >
              <Menu.Items className='absolute right-0 z-10 mt-3 w-36 origin-top-right divide-y divide-gray-100 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                <div className='py-1'>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href='#'
                        className={cx('block px-4 py-2 text-sm', {
                          'bg-gray-100 text-gray-900': active,
                          'text-gray-700': !active
                        })}
                      >
                        Create event
                      </a>
                    )}
                  </Menu.Item>
                </div>
                <div className='py-1'>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={goToToday}
                        className={cx('block px-4 py-2 text-sm', {
                          'bg-gray-100 text-gray-900': active,
                          'text-gray-700': !active
                        })}
                      >
                        Go to today
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </header>
      <div className='lg:flex lg:flex-auto lg:flex-col'>
        <div className='grid grid-cols-7 gap-px border-b border-gray-300 bg-gray-200 text-center text-xs font-semibold leading-6 text-gray-700 lg:flex-none'>
          {getWeekDays().map((weekday) => {
            return (
              <div key={weekday} className='bg-white py-2'>
                <span className='sm:grid hidden'>{weekday.format('dddd')}</span>
                <span className='grid sm:hidden'>{weekday.format('ddd')}</span>
              </div>
            )
          })}
        </div>
        <div className='flex bg-gray-200 text-xs leading-6 text-gray-700 lg:flex-auto'>
          <div
            className={cx('hidden w-full lg:grid lg:gap-px', {
              [`lg:grid-cols-${getWeekDays().length}`]: true,
              [`lg:grid-rows-${arrayOfWeeks.length}`]: true
            })}
          >
            {arrayOfWeeks.map((week) => {
              return week.dates.map((date) => {
                return (
                  <div
                    key={date.datetime}
                    className={cx('relative px-3 py-2', {
                      'bg-white': date.isCurrentMonth,
                      'bg-gray-50 text-gray-500': !date.isCurrentMonth
                    })}
                  >
                    <time
                      dateTime={date.datetime}
                      className={cx({
                        'flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 font-semibold text-white': date.isToday
                      })}
                    >
                      {date.day}
                    </time>
                    {/*{day.events.length > 0 && (*/}
                    {/*  <ol className='mt-2'>*/}
                    {/*    {day.events.slice(0, 2).map((event) => (*/}
                    {/*      <li key={event.id}>*/}
                    {/*        <a href={event.href} className='group flex'>*/}
                    {/*          <p className='flex-auto truncate font-medium text-gray-900 group-hover:text-blue-600'>{event.name}</p>*/}
                    {/*          <time*/}
                    {/*            dateTime={event.datetime}*/}
                    {/*            className='ml-3 hidden flex-none text-gray-500 group-hover:text-blue-600 xl:block'*/}
                    {/*          >*/}
                    {/*            {event.time}*/}
                    {/*          </time>*/}
                    {/*        </a>*/}
                    {/*      </li>*/}
                    {/*    ))}{' '}*/}
                    {/*    {day.events.length > 2 && <li className='text-gray-500'>+ {day.events.length - 2} more</li>}*/}
                    {/*  </ol>*/}
                    {/*)}*/}
                  </div>
                )
              })
            })}
          </div>
          <div
            className={cx('isolate grid w-full gap-px lg:hidden', {
              [`grid-cols-${getWeekDays().length}`]: true,
              [`grid-rows-${arrayOfWeeks.length}`]: true
            })}
          >
            {arrayOfWeeks.map((week) => {
              return week.dates.map((date) => {
                return (
                  <button
                    onClick={() => setSelectedDay(date)}
                    key={date.datetime}
                    type='button'
                    className={cx('flex h-14 flex-col px-3 py-2 hover:bg-gray-100 focus:z-10', {
                      'bg-white': date.isCurrentMonth,
                      'bg-gray-50': !date.isCurrentMonth,
                      'font-semibold': date === selectedDay || date.isToday,
                      'text-white': date === selectedDay,
                      'text-blue-600': !date === selectedDay && date.isToday,
                      'text-gray-900': !date === selectedDay && date.isCurrentMonth && !date.isToday,
                      'text-gray-500': !date === selectedDay && !date.isCurrentMonth && !date.isToday
                    })}
                  >
                    <time
                      dateTime={date.day}
                      className={cx('ml-auto', {
                        'flex h-6 w-6 items-center justify-center rounded-full': date === selectedDay,
                        'bg-blue-600': date === selectedDay && date.isToday,
                        'bg-gray-900': date === selectedDay && !date.isToday
                      })}
                    >
                      {date.day}
                    </time>
                    {/*<span className='sr-only'>{day.events.length} events</span>*/}
                    {/*{day.events.length > 0 && (*/}
                    {/*  <span className='-mx-0.5 mt-auto flex flex-wrap-reverse'>*/}
                    {/*    {day.events.map((event) => (*/}
                    {/*      <span key={event.id} className='mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-gray-400' />*/}
                    {/*    ))}*/}
                    {/*  </span>*/}
                    {/*)}*/}
                  </button>
                )
              })
            })}
          </div>
        </div>
      </div>
      {selectedDay?.events?.length > 0 && (
        <div className='px-4 py-6 sm:px-6 lg:hidden'>
          <ol className='divide-y divide-gray-100 overflow-hidden rounded-lg bg-white text-sm shadow ring-1 ring-black ring-opacity-5'>
            {selectedDay.events.map((event) => (
              <li key={event.id} className='group flex p-4 pr-6 focus-within:bg-gray-50 hover:bg-gray-50'>
                <div className='flex-auto'>
                  <p className='font-semibold text-gray-900'>{event.name}</p>
                  <time dateTime={event.datetime} className='mt-2 flex items-center text-gray-700'>
                    <ClockIcon className='mr-2 h-5 w-5 text-gray-400' aria-hidden='true' />
                    {event.time}
                  </time>
                </div>
                <a
                  href={event.href}
                  className='ml-6 flex-none self-center rounded-md bg-white px-3 py-2 font-semibold text-gray-900 opacity-0 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400 focus:opacity-100 group-hover:opacity-100'
                >
                  Edit<span className='sr-only'>, {event.name}</span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  )
}
