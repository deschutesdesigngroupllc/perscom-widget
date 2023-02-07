import * as Sentry from '@sentry/react'
import React, { useState } from 'react'
import useQuery from '../api/APIUtils'
import { Error } from '../components/Error'
import { Footer } from '../components/Footer'
import { Loading } from '../components/Loading'
import { config } from '../constants'
import { Table } from '../components/Table'
import PropTypes from 'prop-types'

function Qualifications({ apiKey, perscomId }) {
  const [url, setUrl] = useState(config.qualifications.API_URL)

  const { data, links, meta, loading, error } = useQuery({
    url: url,
    apiKey: apiKey,
    perscomId: perscomId
  })

  const onPaginationClick = (url) => {
    setUrl(url)
  }

  return (
    <div className='p-1'>
      {loading ? (
        <Loading />
      ) : (
        <>
          {error && <Error error={error} />}
          {data && !!data.length && renderQualifications(data, links, meta, onPaginationClick)}
        </>
      )}
      <Footer />
    </div>
  )
}

function renderQualifications(qualifications, links, meta, onPaginationClick) {
  return (
    <Table
      columns={[
        {
          name: 'Qualification',
          hidden: true,
          headerClasses: ['hidden', 'sm:table-cell'],
          cellClasses: ['hidden', 'sm:table-cell', 'w-1/6', '!py-4'],
          cellContent: (qualification) => {
            const { name, image_url } = qualification
            return (
              <>
                {image_url ? (
                  <img className='w-28 block mx-auto' src={image_url} alt={name} />
                ) : (
                  <div className='text-center font-bold text-sm'>No Image</div>
                )}
              </>
            )
          }
        },
        {
          name: 'Qualification',
          key: 'description',
          cellClasses: ['!whitespace-normal', 'break-normal', '!py-4'],
          cellContent: (qualification) => {
            const { name, description, image_url } = qualification
            return (
              <>
                {image_url && (
                  <div className='sm:hidden flex mb-2'>
                    <img className='w-20' src={image_url} alt={name} />
                  </div>
                )}
                <div className='font-semibold text-black mb-2'>{name}</div>
                <div className='text-sm'>{description}</div>
              </>
            )
          }
        }
      ]}
      rows={qualifications}
      links={links}
      meta={meta}
      onPaginationClick={onPaginationClick}
    />
  )
}

Qualifications.propTypes = {
  apiKey: PropTypes.string,
  perscomId: PropTypes.string
}

export default Sentry.withProfiler(Qualifications)
