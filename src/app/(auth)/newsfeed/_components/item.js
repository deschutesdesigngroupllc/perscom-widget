'use client';

import cx from 'classnames';
import dayjs from 'dayjs';
import timezonePlugin from 'dayjs/plugin/timezone';
import utcPlugin from 'dayjs/plugin/utc';
import { Avatar } from 'flowbite-react';
import { useSearchParams } from 'next/navigation';
import TimeAgo from 'react-timeago';

export function Item({ item, currentUser, onLikeClick, onUnlikeClick }) {
  const searchParams = useSearchParams();

  dayjs.extend(utcPlugin);
  dayjs.extend(timezonePlugin);
  dayjs.tz.setDefault(searchParams.get('timezone') ?? 'UTC');

  const {
    id,
    author,
    author_profile_photo,
    recipient,
    recipient_profile_photo,
    description,
    event,
    type,
    headline,
    text,
    item: itemHtml,
    color,
    likes,
    url,
    created_at
  } = item;

  const getTitle = (event, type) => {
    switch (event) {
      case 'created':
        return `added a new ${type}`;
      default:
        return `added a new message`;
    }
  };

  const getHeadline = (headline, description) => {
    return headline ?? description;
  };

  const getText = (text, description) => {
    return text ?? description ?? 'No content exists for this item.';
  };

  return (
    <div className="flex flex-col space-y-4" key={id} data-testid={headline}>
      <div className="mb-10 mt-2 flex flex-col space-y-2">
        <div className="flex flex-col items-start justify-start space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <a href={url} target="_blank" rel="noreferrer">
            <div className="flex flex-row items-center space-x-2">
              {recipient && (
                <>
                  {recipient_profile_photo ? (
                    <Avatar
                      stacked
                      rounded
                      img={recipient_profile_photo}
                      alt={recipient}
                      size="xs"
                    />
                  ) : (
                    <Avatar stacked rounded alt={recipient} size="xs" />
                  )}
                </>
              )}
              <h5
                className={cx(
                  'text-sm font-semibold uppercase text-gray-950 dark:text-white sm:leading-6',
                  {
                    'text-blue-800': color === 'info',
                    'text-red-800': color === 'failure',
                    'text-green-800': color === 'success',
                    'text-yellow-800': color === 'warning',
                    'hover:text-gray-600': url,
                    'cursor-default': !url
                  }
                )}
              >
                {getHeadline(headline, description)}
              </h5>
            </div>
          </a>
          <time
            className={cx('hidden text-xs text-gray-700 dark:text-gray-400 md:block', {
              'text-blue-700': color === 'info',
              'text-red-700': color === 'failure',
              'text-green-700': color === 'success',
              'text-yellow-700': color === 'warning'
            })}
            dateTime={dayjs(created_at)
              .tz(searchParams.get('timezone') ?? 'UTC')
              .format('YYYY-MM-DD')}
          >
            {dayjs(created_at)
              .tz(searchParams.get('timezone') ?? 'UTC')
              .format('dddd, MMM D, YYYY')}
          </time>
        </div>
        <div>
          {itemHtml && (
            <div
              className="my-2 text-xs font-medium text-gray-700 dark:text-gray-400"
              dangerouslySetInnerHTML={{ __html: itemHtml }}
            ></div>
          )}
          <div
            className={cx('text-xs text-gray-700 dark:text-gray-400', {
              'text-blue-700': color === 'info',
              'text-red-700': color === 'failure',
              'text-green-700': color === 'success',
              'text-yellow-700': color === 'warning'
            })}
            dangerouslySetInnerHTML={{ __html: getText(text, description) }}
          ></div>
        </div>
        <time
          className={cx('block text-xs text-gray-700 dark:text-gray-400 md:hidden', {
            'text-blue-700': color === 'info',
            'text-red-700': color === 'failure',
            'text-green-700': color === 'success',
            'text-yellow-700': color === 'warning'
          })}
          dateTime={dayjs(created_at)
            .tz(searchParams.get('timezone') ?? 'UTC')
            .format('YYYY-MM-DD')}
        >
          {dayjs(created_at)
            .tz(searchParams.get('timezone') ?? 'UTC')
            .format('dddd, MMM D, YYYY')}
        </time>
      </div>
      <div className="!-my-4 -mx-6 border-t border-gray-100 bg-gray-50 text-gray-700 last:rounded-b dark:border-gray-900 dark:bg-[#09090B] dark:text-gray-400">
        <div className="flex flex-row items-center space-x-2 px-6 py-2 text-xs">
          {author_profile_photo ? (
            <Avatar stacked rounded img={author_profile_photo} alt={author} size="xs" />
          ) : (
            <Avatar stacked rounded alt={author} size="xs" />
          )}
          <div className="text-xs font-normal">
            <span className="font-bold">{author ?? 'User'}</span> {getTitle(event, type)} &#8226;{' '}
            <span className="font-light">
              <TimeAgo date={created_at} />
            </span>
          </div>
        </div>
      </div>

      {/*<Likes likes={likes} currentUser={currentUser} />*/}
    </div>
  );
}
