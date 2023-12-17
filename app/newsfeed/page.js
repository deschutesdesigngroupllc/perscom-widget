import Client from '../../api/client';
import { Avatar } from 'flowbite-react';
import { Card } from '../../components/card';
import { TimeAgo } from '../../components/timeago';
import cx from 'classnames';
import Auth from '../../api/auth';
import { Likes } from './_components/likes';
import { formatDate } from '../../utils/helpers';

export const metadata = {
  title: 'Newsfeed'
};

export default async function Page({ searchParams }) {
  const auth = new Auth(searchParams);
  const newsfeed = await new Client(auth).getNewsfeed();

  return (
    <div className="flex flex-col space-y-2">
      <div className="flex flex-col space-y-6">
        {newsfeed.data &&
          !!newsfeed.data.length &&
          newsfeed.data.map((item) => {
            return (
              <NewsfeedItem key={item.id} item={item} currentUser={auth.getAuthIdentifier()} />
            );
          })}
      </div>
    </div>
  );
}

function NewsfeedItem({ item, currentUser }) {
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

  return (
    <div className="flex flex-col space-y-3" key={id} data-testid={headline}>
      <div className="flex flex-row items-center space-x-2 px-1 text-sm">
        {author_profile_photo ? (
          <Avatar stacked rounded img={author_profile_photo} alt={author} size="xs" />
        ) : (
          <Avatar stacked rounded alt={author} size="xs" />
        )}
        <div className="text-xs font-normal">
          <span className="font-bold">{author ?? 'User'}</span> {getTitle(event, type)} &#8226;{' '}
          <span className="font-light">{/*<TimeAgo date={created_at} />*/}</span>
        </div>
      </div>
      <Card
        target="_blank"
        className={cx('gap-2 p-6', {
          'bg-blue-50 ring-1 ring-blue-600 hover:bg-blue-100': color === 'info',
          'bg-red-50 ring-1 ring-red-600 hover:bg-red-100': color === 'failure',
          'bg-green-50 ring-1 ring-green-600 hover:bg-green-100': color === 'success',
          'bg-yellow-50 ring-1 ring-yellow-400 hover:bg-yellow-100': color === 'warning'
        })}
      >
        <div className="flex flex-col space-y-4">
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
                  className={cx('font-bold hover:text-gray-600', {
                    'text-blue-800': color === 'info',
                    'text-red-800': color === 'failure',
                    'text-green-800': color === 'success',
                    'text-yellow-800': color === 'warning'
                  })}
                >
                  {getHeadline(headline, description)}
                </h5>
              </div>
            </a>
            <div
              className={cx('text-xs', {
                'text-blue-700': color === 'info',
                'text-red-700': color === 'failure',
                'text-green-700': color === 'success',
                'text-yellow-700': color === 'warning'
              })}
            >
              {formatDate(created_at)}
            </div>
          </div>
          <div className="flex flex-col space-y-4">
            {itemHtml && (
              <div
                className="text-sm font-medium"
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
            <Likes likes={likes} currentUser={currentUser} />
          </div>
        </div>
      </Card>
    </div>
  );
}

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
