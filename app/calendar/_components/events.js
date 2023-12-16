'use client';

import { Modal, ModalBody, ModalHeader } from 'flowbite-react';
import { CalendarIcon, ClockIcon, InformationCircleIcon, MapIcon } from '@heroicons/react/20/solid';

export function Events({ selectedDay, selectedEvent, modalState, setModalState }) {
  return (
    <>
      {selectedDay?.events?.length > 0 && (
        <div className="px-4 py-10 sm:px-6 lg:hidden">
          <ol className="divide-y divide-gray-100 overflow-hidden rounded-lg bg-white text-sm shadow ring-1 ring-black ring-opacity-5 dark:divide-gray-700 dark:bg-gray-800">
            {selectedDay.events.map((event) => (
              <li
                key={event.id}
                className="group flex p-4 pr-6 hover:bg-gray-50 dark:hover:bg-gray-900"
              >
                <a href="#">
                  <div className="flex-auto">
                    <p className="font-bold">{event.name}</p>
                    {event.description && <p className="mt-1 text-sm">{event.description}</p>}
                    <div className="mt-2 flex items-center">
                      <ClockIcon
                        className="mr-2 h-5 w-5 flex-shrink-0 text-gray-500"
                        aria-hidden="true"
                      />
                      <time dateTime={event.start}>{event.timeStart}</time>
                      {event.end && <time dateTime={event.end}> - {event.timeEnd}</time>}
                    </div>
                    {event.calendar && (
                      <div className="mt-2 flex items-center">
                        <CalendarIcon
                          className="mr-2 h-5 w-5 flex-shrink-0 text-gray-500"
                          aria-hidden="true"
                        />
                        {event.calendar}
                      </div>
                    )}
                    {event.location && (
                      <div className="mt-2 flex items-center">
                        <MapIcon
                          className="mr-2 h-5 w-5 flex-shrink-0 text-gray-500"
                          aria-hidden="true"
                        />
                        {event.location}
                      </div>
                    )}
                    {event.details && (
                      <div className="mt-2 flex items-center">
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
          <div className="flex-auto text-sm">
            {selectedEvent.description && <p>{selectedEvent.description}</p>}
            <div className="mt-4 flex items-center ">
              <ClockIcon className="mr-2 h-5 w-5 flex-shrink-0 text-gray-500" aria-hidden="true" />
              <time dateTime={selectedEvent.start}>{selectedEvent.timeStart}</time>
              {selectedEvent.end && (
                <time dateTime={selectedEvent.end}> - {selectedEvent.timeEnd}</time>
              )}
            </div>
            {selectedEvent.calendar && (
              <div className="mt-2 flex items-center">
                <CalendarIcon
                  className="mr-2 h-5 w-5 flex-shrink-0 text-gray-500"
                  aria-hidden="true"
                />
                {selectedEvent.calendar}
              </div>
            )}
            {selectedEvent.location && (
              <div className="mt-2 flex items-center">
                <MapIcon className="mr-2 h-5 w-5 flex-shrink-0 text-gray-500" aria-hidden="true" />
                {selectedEvent.location}
              </div>
            )}
            {selectedEvent.details && (
              <div className="mt-2 flex items-center">
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
