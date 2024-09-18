'use client';

import {
  CalendarDaysIcon,
  ClockIcon,
  InformationCircleIcon,
  MapIcon
} from '@heroicons/react/20/solid';
import { Modal, ModalBody, ModalHeader } from 'flowbite-react';

export function Events({ selectedDay, selectedEvent, modalState, setModalState }) {
  return (
    <>
      {selectedDay.events && !!selectedDay.events.length && (
        <div className="px-4 py-10 sm:px-6 lg:hidden">
          <ol className="divide-y divide-gray-100 overflow-hidden rounded-lg bg-white text-sm shadow ring-1 ring-black ring-opacity-5 dark:divide-gray-700 dark:bg-gray-800">
            {selectedDay.events.map((event) => (
              <li
                key={event.id}
                className="group flex p-4 pr-6 hover:bg-gray-50 dark:hover:bg-gray-900"
              >
                <a href="#">
                  <div className="flex flex-col space-y-2">
                    <div className="font-bold">{event.name}</div>
                    {event.description && (
                      <div dangerouslySetInnerHTML={{ __html: event.description }}></div>
                    )}
                    {!event.allDay && (
                      <div className="flex items-center">
                        <ClockIcon
                          className="mr-2 h-5 w-5 flex-shrink-0 text-gray-500"
                          aria-hidden="true"
                        />
                        {event.start && (
                          <time dateTime={event.start.format('YYYY-MM-DD HH:mm:ss')}>
                            {event.start.format('h:mm A')}
                          </time>
                        )}
                        {event.end && (
                          <>
                            &nbsp;-&nbsp;
                            <time dateTime={event.end}>{event.end.format('h:mm A')}</time>
                          </>
                        )}
                      </div>
                    )}
                    {event.calendar && (
                      <div className="flex items-center">
                        <CalendarDaysIcon
                          className="mr-2 h-5 w-5 flex-shrink-0 text-gray-500"
                          aria-hidden="true"
                        />
                        {event.calendar}
                      </div>
                    )}
                    {event.location && (
                      <div className="flex items-center">
                        <MapIcon
                          className="mr-2 h-5 w-5 flex-shrink-0 text-gray-500"
                          aria-hidden="true"
                        />
                        {event.location}
                      </div>
                    )}
                    {event.details && (
                      <div className="flex items-center">
                        <InformationCircleIcon
                          className="mr-2 h-5 w-5 flex-shrink-0 text-gray-500"
                          aria-hidden="true"
                        />
                        {event.details}
                      </div>
                    )}
                  </div>
                </a>
              </li>
            ))}
          </ol>
        </div>
      )}
      <Modal dismissible show={modalState} onClose={() => setModalState(false)}>
        <ModalHeader>{selectedEvent.name}</ModalHeader>
        <ModalBody>
          <div className="flex flex-col space-y-2 text-sm">
            {selectedEvent.description && (
              <div dangerouslySetInnerHTML={{ __html: selectedEvent.description }}></div>
            )}
            {!selectedEvent.allDay && (
              <div className="flex items-center">
                <ClockIcon
                  className="mr-2 h-5 w-5 flex-shrink-0 text-gray-500"
                  aria-hidden="true"
                />
                {selectedEvent.start && (
                  <time dateTime={selectedEvent.start.format('YYYY-MM-DD HH:mm')}>
                    {selectedEvent.start.format('h:mm A')}
                  </time>
                )}
                {selectedEvent.end && (
                  <>
                    &nbsp;-&nbsp;
                    <time dateTime={selectedEvent.end.format('YYYY-MM-DD HH:mm')}>
                      {selectedEvent.end.format('h:mm A')}
                    </time>
                  </>
                )}
              </div>
            )}
            {selectedEvent.calendar && (
              <div className="flex items-center">
                <CalendarDaysIcon
                  className="mr-2 h-5 w-5 flex-shrink-0 text-gray-500"
                  aria-hidden="true"
                />
                {selectedEvent.calendar}
              </div>
            )}
            {selectedEvent.location && (
              <div className="flex items-center">
                <MapIcon className="mr-2 h-5 w-5 flex-shrink-0 text-gray-500" aria-hidden="true" />
                {selectedEvent.location}
              </div>
            )}
            {selectedEvent.details && (
              <div className="flex items-center">
                <InformationCircleIcon
                  className="mr-2 h-5 w-5 flex-shrink-0 text-gray-500"
                  aria-hidden="true"
                />
                {selectedEvent.details}
              </div>
            )}
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}
