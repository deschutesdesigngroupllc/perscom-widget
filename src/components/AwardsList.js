// import React from 'react'
// import fetchData from '../api/fetchData'
// import Table from '../components/Table'

// const data = fetchData('awards/?include=image')

export const AwardsList = () => {
  // const awards = data.read()

  throw new Error('test')

  // return (
  //   <Table
  //     columns={[
  //       {
  //         name: 'Awards',
  //         headerClasses: ['text-center'],
  //         headerAttributes: { colSpan: '2' },
  //         cellClasses: ['hidden', 'sm:table-cell', 'w-1/6', '!py-4'],
  //         cellContent: (award) => {
  //           const { name, image } = award
  //           const { image_url } = image ?? {}
  //           return (
  //             <>
  //               {image_url ? (
  //                 <img className='w-28 block mx-auto' src={image_url} alt={name} />
  //               ) : (
  //                 <div className='text-center font-medium'>No Image</div>
  //               )}
  //             </>
  //           )
  //         }
  //       },
  //       {
  //         name: 'Award',
  //         key: 'description',
  //         hidden: true,
  //         cellClasses: ['!whitespace-normal', 'break-normal', '!py-4'],
  //         cellContent: (award) => {
  //           const { name, description, image } = award
  //           const { image_url } = image ?? {}
  //           return (
  //             <>
  //               {image_url && (
  //                 <div className='sm:hidden flex mb-2'>
  //                   <img className='w-20' src={image_url} alt={name} />
  //                 </div>
  //               )}
  //               <div className='text-sm font-semibold mb-2'>{name}</div>
  //               <div className='text-sm'>{description}</div>
  //             </>
  //           )
  //         }
  //       }
  //     ]}
  //     rows={awards.data}
  //     meta={awards.meta}
  //     onPaginationClick={(page) => {
  //       const currentUrlParams = new URLSearchParams(window.location.search)
  //       currentUrlParams.set('page', page)
  //       window.location.search = currentUrlParams.toString()
  //     }}
  //   />
  // )
}
