'use client';

import cx from 'classnames';
import { Avatar } from 'flowbite-react';
import TimeAgo from 'react-timeago';
import { Card } from '../../../components/card';
import { formatDate } from '../../../utils/helpers';

export function Item({ item, currentUser, onLikeClick, onUnlikeClick }) {
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
      <div className="flex flex-row items-center space-x-2 px-1 text-sm">
        {author_profile_photo ? (
          <Avatar stacked rounded img={author_profile_photo} alt={author} size="xs" />
        ) : (
          <Avatar stacked rounded alt={author} size="xs" />
        )}
        <div className="text-sm font-normal">
          <span className="font-bold">{author ?? 'User'}</span> {getTitle(event, type)} &#8226;{' '}
          <span className="font-light">
            <TimeAgo date={created_at} />
          </span>
        </div>
      </div>
      <Card
        target="_blank"
        className={cx('!gap-2 p-6', {
          'bg-blue-50 ring-1 ring-blue-600': color === 'info',
          'bg-red-50 ring-1 ring-red-600': color === 'failure',
          'bg-green-50 ring-1 ring-green-600': color === 'success',
          'bg-yellow-50 ring-1 ring-yellow-400': color === 'warning'
        })}
      >
        <div className="flex flex-col space-y-2">
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
                  className={cx('text-sm font-semibold uppercase sm:leading-6', {
                    'text-blue-800': color === 'info',
                    'text-red-800': color === 'failure',
                    'text-green-800': color === 'success',
                    'text-yellow-800': color === 'warning',
                    'hover:text-gray-600': url,
                    'cursor-default': !url
                  })}
                >
                  {getHeadline(headline, description)}
                </h5>
              </div>
            </a>
            <div
              className={cx('hidden text-xs text-gray-400 dark:text-gray-500 md:block', {
                'text-blue-700': color === 'info',
                'text-red-700': color === 'failure',
                'text-green-700': color === 'success',
                'text-yellow-700': color === 'warning'
              })}
            >
              {formatDate(created_at)}
            </div>
          </div>
          <div>
            {itemHtml && (
              <div
                className="my-2 text-sm font-medium"
                dangerouslySetInnerHTML={{ __html: itemHtml }}
              ></div>
            )}
            <div
              className={cx('text-sm', {
                'text-blue-700': color === 'info',
                'text-red-700': color === 'failure',
                'text-green-700': color === 'success',
                'text-yellow-700': color === 'warning'
              })}
              dangerouslySetInnerHTML={{ __html: getText(text, description) }}
            ></div>
          </div>
          <div
            className={cx('block text-xs text-gray-400 dark:text-gray-500 md:hidden', {
              'text-blue-700': color === 'info',
              'text-red-700': color === 'failure',
              'text-green-700': color === 'success',
              'text-yellow-700': color === 'warning'
            })}
          >
            {formatDate(created_at)}
          </div>
        </div>
        {/*<Likes likes={likes} currentUser={currentUser} />*/}
      </Card>
    </div>
  );
}
