import * as Sentry from '@sentry/react'
import React from 'react'
import useFetch from '../hooks/useFetch'
import { Loading } from '../components/Loading'
import { config } from '../constants'
import { Alert } from '../components/Alert'
import { Card } from 'flowbite-react'
import TimeAgo from 'react-timeago'

function Newsfeed() {
  const { data, loading, error } = useFetch({
    url: config.newsfeed.API_URL
  })

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {error ? (
            <Alert message={error} type='failure' />
          ) : data && !!data.length ? (
            <div className='flex flex-col space-y-6'>{data.map((item) => renderNewsfeed(item))}</div>
          ) : (
            <Alert message='No newsfeed items found. Please try again later.' />
          )}
        </>
      )}
    </>
  )
}

function renderNewsfeed(item) {
  const { newsfeed, created_at, causer, subject, properties, id } = item
  const { title, author } = newsfeed ?? {}
  const { profile_photo_url: causer_profile_photo_url } = causer ?? {}
  const { user: subject_user } = subject ?? {}
  const { profile_photo_url: subject_user_profile_photo_url } = subject_user ?? {}
  const { headline, text } = properties ?? {}

  return (
    <div className='flex flex-col space-y-2' key={id}>
      <div className='text-sm text-gray-500 px-1 flex flex-row items-center justify-between'>
        <div className='flex flex-row items-center space-x-1'>
          <div className='w-6 h-6'>
            {causer_profile_photo_url ? (
              <img src={causer_profile_photo_url} />
            ) : (
              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='text-gray-400'>
                <path
                  fillRule='evenodd'
                  d='M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z'
                  clipRule='evenodd'
                />
              </svg>
            )}
          </div>
          <div className='font-normal text-xs'>
            <span className='font-bold'>{author}</span> {title} &#8226;{' '}
            <span className='text-gray-400'>
              <TimeAgo date={created_at} />
            </span>
          </div>
        </div>
        <div>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z'
            />
          </svg>
        </div>
      </div>
      <Card className='gap-2'>
        <div className='flex flex-row items-center space-x-1'>
          <div className='w-6 h-6'>
            {subject_user_profile_photo_url ? (
              <img src={subject_user_profile_photo_url} />
            ) : (
              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='text-gray-400'>
                <path
                  fillRule='evenodd'
                  d='M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z'
                  clipRule='evenodd'
                />
              </svg>
            )}
          </div>
          <h5 className='font-bold tracking-tight text-gray-900 dark:text-white truncate'>{headline}</h5>
        </div>
        <div className='text-sm text-gray-500'>{text}</div>
        <div className='text-xs text-gray-400 mt-2'>{formatDate(created_at)}</div>
      </Card>
    </div>
  )
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-us', { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' })
}

export default Sentry.withProfiler(Newsfeed)
