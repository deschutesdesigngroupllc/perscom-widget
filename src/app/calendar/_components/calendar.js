'use client';

import cx from 'classnames';
import dayjs, { locale } from 'dayjs';
import isTodayPlugin from 'dayjs/plugin/isToday';
import timezonePlugin from 'dayjs/plugin/timezone';
import objectPlugin from 'dayjs/plugin/toObject';
import utcPlugin from 'dayjs/plugin/utc';
import weekdayPlugin from 'dayjs/plugin/weekday';
import { useState } from 'react';
import { Card } from '../../../components/card';
import { Days } from './days';
import { Events } from './events';
import { Header } from './header';
import { Weekdays } from './weekdays';

export function Calendar({ events }) {
  dayjs.extend(weekdayPlugin);
  dayjs.extend(objectPlugin);
  dayjs.extend(isTodayPlugin);
  dayjs.extend(utcPlugin);
  dayjs.extend(timezonePlugin);
  dayjs.tz.setDefault('UTC');

  const now = dayjs().locale({
    ...locale()
  });

  const [currentMonth, setCurrentMonth] = useState(now);
  const [selectedDay, setSelectedDay] = useState({});
  const [selectedEvent, setSelectedEvent] = useState({});
  const [modalState, setModalState] = useState(false);

  const goToToday = () => {
    setCurrentMonth(now);
    setSelectedDay({});
  };

  const nextMonth = () => {
    setCurrentMonth(currentMonth.add(1, 'month'));
    setSelectedDay({});
  };

  const previousMonth = () => {
    setCurrentMonth(currentMonth.subtract(1, 'month'));
    setSelectedDay({});
  };

  const handleDayEventSelect = (day, event, openModal) => {
    setSelectedDay(day);
    setSelectedEvent(event);
    setModalState(openModal);
  };

  const headerProps = {
    currentMonth,
    previousMonth,
    goToToday,
    nextMonth
  };

  const dayProps = {
    currentMonth,
    handleDayEventSelect,
    events
  };

  const eventProps = {
    selectedDay,
    selectedEvent,
    modalState,
    setModalState
  };

  return (
    <Card>
      <div className="rounded-md bg-gray-50 dark:bg-gray-700">
        <div className="lg:flex lg:h-full lg:flex-col">
          <Header {...headerProps} />
          <div
            className={cx('shadow-sm lg:flex lg:flex-auto lg:flex-col lg:border-none', {
              'border-b border-gray-200 dark:border-gray-600': selectedDay?.events?.length
            })}
          >
            <Weekdays now={now} />
            <Days {...dayProps} />
          </div>
          <Events {...eventProps} />
        </div>
      </div>
    </Card>
  );
}
