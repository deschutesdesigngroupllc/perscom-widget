import * as Sentry from '@sentry/react'
import PropTypes from 'prop-types'
import React from 'react'
import useQuery from '../api/APIUtils'
import { Error } from '../components/Error'
import { Footer } from '../components/Footer'
import { Loading } from '../components/Loading'
import { config } from '../constants'
import { Table } from '../components/Table'

function Awards({ domElement }) {
  const apiKey = domElement.getAttribute('data-apikey')
  const perscomId = domElement.getAttribute('data-perscomid')
  const { data, loading, error } = useQuery({
    url: config.awards.API_URL,
    perscomId,
    apiKey
  })

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {error && <Error error={error} />}
          {data && !!data.length && renderAwards(data)}
        </>
      )}
      <Footer />
    </>
  )
}

function renderAwards(awards) {
  return (
    <Table
      columns={[
        {
          name: 'Award',
          hidden: true,
          cellClasses: ['w-1/6'],
          content: (award) => {
            const { name, image_url } = award
            return (
              <>
                {image_url ? (
                  <img className='block mx-auto' src={image_url} alt={name} />
                ) : (
                  <div className='text-center font-bold text-sm'>No Image</div>
                )}
              </>
            )
          }
        },
        {
          name: 'Award',
          key: 'description',
          cellClasses: ['!whitespace-normal', 'break-normal'],
          content: (award) => {
            const { name, description } = award
            return (
              <div className='flex flex-col space-y-2'>
                <div className='font-semibold text-black'>{name}</div>
                <div className='text-sm'>{description}</div>
              </div>
            )
          }
        }
      ]}
      rows={awards}
    />
  )
}

Awards.propTypes = {
  domElement: PropTypes.object.isRequired
}

export default Sentry.withProfiler(Awards)
