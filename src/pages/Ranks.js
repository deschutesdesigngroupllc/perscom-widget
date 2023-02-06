import * as Sentry from '@sentry/react'
import React from 'react'
import useQuery from '../api/APIUtils'
import { Error } from '../components/Error'
import { Footer } from '../components/Footer'
import { Loading } from '../components/Loading'
import { config } from '../constants'
import { Table } from '../components/Table'
import PropTypes from 'prop-types'

function Ranks({ apiKey, perscomId, page }) {
  const { data, links, meta, loading, error } = useQuery({
    url: config.ranks.API_URL,
    widgetId: 'ranks',
    page: page,
    apiKey: apiKey,
    perscomId: perscomId
  })

  return (
    <div className='p-1'>
      {loading ? (
        <Loading />
      ) : (
        <>
          {error && <Error error={error} />}
          {data && !!data.length && renderRanks(data, links, meta)}
        </>
      )}
      <Footer />
    </div>
  )
}

function renderRanks(ranks, links, meta) {
  return (
    <Table
      columns={[
        {
          name: 'Rank',
          hidden: true,
          headerClasses: ['hidden', 'sm:table-cell'],
          cellClasses: ['hidden', 'sm:table-cell', 'w-1/6', '!py-4'],
          cellContent: (rank) => {
            const { name, image_url } = rank
            return (
              <>
                {image_url ? (
                  <img className='w-16 block mx-auto' src={image_url} alt={name} />
                ) : (
                  <div className='text-center font-bold text-sm'>No Image</div>
                )}
              </>
            )
          }
        },
        {
          name: 'Rank',
          key: 'description',
          cellClasses: ['!whitespace-normal', 'break-normal', '!py-4'],
          cellContent: (rank) => {
            const { name, description, image_url } = rank
            return (
              <>
                {image_url && (
                  <div className='sm:hidden flex mb-2'>
                    <img className='w-10' src={image_url} alt={name} />
                  </div>
                )}
                <div className='font-semibold text-black mb-2'>{name}</div>
                <div className='text-sm'>{description}</div>
              </>
            )
          }
        }
      ]}
      rows={ranks}
      links={links}
      meta={meta}
    />
  )
}

Ranks.propTypes = {
  apiKey: PropTypes.string,
  perscomId: PropTypes.string,
  page: PropTypes.string
}

export default Sentry.withProfiler(Ranks)
