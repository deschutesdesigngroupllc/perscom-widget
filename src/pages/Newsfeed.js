import * as Sentry from '@sentry/react'
import React, { useState } from 'react'
import useFetch from '../hooks/useFetch'
import { Loading } from '../components/Loading'
import { config } from '../constants'
import { Alert } from '../components/Alert'
import { Avatar, Card, Pagination } from 'flowbite-react'
import TimeAgo from 'react-timeago'
import cx from 'classnames'

function Newsfeed() {
  const [url, setUrl] = useState(config.newsfeed.API_URL)

  const { data, meta, loading, error } = useFetch({
    url: url
  })

  const onPaginationClick = (page) => {
    const newUrl = new URL(url)
    newUrl.searchParams.set('page', page)

    setUrl(newUrl.href)
  }

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {error ? (
            <Alert message={error} type='failure' />
          ) : data && !!data.length ? (
            renderNewsFeed(data, meta, onPaginationClick)
          ) : (
            <Alert message='No newsfeed items found. Please try again later.' />
          )}
        </>
      )}
    </>
  )
}

function renderNewsFeed(data, meta, onPaginationClick) {
  const { current_page, last_page } = meta ?? {}

  return (
    <div className='flex flex-col space-y-2'>
      <div className='flex flex-col space-y-6'>{data.map((item) => renderNewsfeedItem(item))}</div>
      {last_page > 1 && <Pagination showIcons currentPage={current_page} onPageChange={onPaginationClick} totalPages={last_page} />}
    </div>
  )
}

function renderNewsfeedItem(item) {
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
    subject,
    color,
    created_at,
    url
  } = item

  return (
    <div className='flex flex-col space-y-2' key={id}>
      <div className='text-sm text-gray-500 px-1 flex flex-row items-center space-x-1'>
        {author_profile_photo ? (
          <Avatar rounded img={author_profile_photo} alt={author} size='xs' />
        ) : (
          <Avatar rounded alt={author} size='xs' />
        )}
        <div className='font-normal text-xs'>
          <span className='font-bold'>{author ?? 'User'}</span> {getTitle(event, type)} &#8226;{' '}
          <span className='text-gray-400'>
            <TimeAgo date={created_at} />
          </span>
        </div>
      </div>
      <Card
        href={url}
        target='_blank'
        className={cx('gap-2', {
          'ring-1 ring-blue-600': color === 'info',
          'ring-1 ring-red-600': color === 'failure',
          'ring-1 ring-green-600': color === 'success',
          'ring-1 ring-yellow-400': color === 'warning'
        })}
      >
        <div className='flex flex-row items-center space-x-1'>
          {recipient && (
            <>
              {recipient_profile_photo ? (
                <Avatar rounded img={recipient_profile_photo} alt={recipient} size='xs' />
              ) : (
                <Avatar rounded alt={recipient} size='xs' />
              )}
            </>
          )}
          <h5 className='font-bold tracking-tight text-gray-900 dark:text-white truncate'>{getHeadline(headline, description)}</h5>
        </div>
        {subject && <div className='text-sm text-gray-600 font-medium' dangerouslySetInnerHTML={{ __html: subject }}></div>}
        <div className='text-sm text-gray-500' dangerouslySetInnerHTML={{ __html: getText(text, description) }}></div>
        <div className='text-xs text-gray-400 mt-2'>{formatDate(created_at)}</div>
      </Card>
    </div>
  )
}

const getTitle = (event, type) => {
  switch (event) {
    case 'created':
      return `added a new ${type}`
    default:
      return `added a new message`
  }
}

const getHeadline = (headline, description) => {
  return headline ?? description
}

const getText = (text, description) => {
  return text ?? description ?? 'No content exists for this item.'
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-us', { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' })
}

export default Sentry.withProfiler(Newsfeed)
