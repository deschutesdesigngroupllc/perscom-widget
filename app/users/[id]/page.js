import Auth from '../../../api/auth';
import ApiClient from '../../../api/client';
import Link from 'next/link';
import Image from 'next/image';
import get from 'lodash/get';
import { ChevronLeftIcon } from '@heroicons/react/20/solid';
import { Card } from '../../../components/card';
import { FieldValue } from '../../../src.old/components/Field';
import { TabItem } from 'flowbite-react';
import { Tabs } from '../../../components/tabs';
import { Datatable } from '../../../components/datatable';
import { AssignmentRecordDateColumn } from '../../../components/resources/datatables/assignmentRecordDateColumn';

export default async function Page({ searchParams, params }) {
  const { id } = params;
  const auth = new Auth(searchParams);
  const userData = await new ApiClient(auth).getUser(id, {
    include: Array(
      'assignment_records',
      'assignment_records.position',
      'assignment_records.specialty',
      'assignment_records.unit',
      'award_records',
      'award_records.award',
      'award_records.award.image',
      'combat_records',
      'fields',
      'position',
      'qualification_records',
      'qualification_records.qualification',
      'qualification_records.qualification.image',
      'rank',
      'rank.image',
      'rank_records',
      'rank_records.rank',
      'rank_records.rank.image',
      'secondary_positions',
      'secondary_specialties',
      'secondary_units',
      'service_records',
      'specialty',
      'status',
      'unit'
    ).join()
  });
  const user = userData.data;

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-row items-center justify-start space-x-1 active:text-blue-600">
        <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
        <Link href={'/roster'} className="text-sm">
          Back to Roster
        </Link>
      </div>
      <Profile user={user} />
    </div>
  );
}

function Profile({ user }) {
  const { name, cover_photo_url } = user;

  return (
    <div className="flex min-h-fit flex-col space-y-4">
      {cover_photo_url && (
        <div className="flex max-h-80 items-center justify-center overflow-hidden">
          <Image src={cover_photo_url} className="w-full object-cover" alt={name} />
        </div>
      )}
      <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
        <Information user={user} />
        <Demographics user={user} />
      </div>
      <AdditionalFields fields={user?.fields} />
      <SecondaryAssignments user={user} />
      <Records user={user} />
      {/*{user?.fields && !!user?.fields.length && renderAdditionalFieldsCard(user)}*/}
      {/*{renderSecondaryAssignments(user, assignmentTabs)}*/}
      {/*{renderRecords(user, recordsTabs)}*/}
    </div>
  );
}

function Information({ user }) {
  const { name, rank, position, profile_photo_url, status } = user;
  const { name: rank_name, abbreviation: rank_abbreviation, image: rank_image } = rank ?? {};
  const { image_url: rank_image_url } = rank_image ?? {};
  const { name: position_name } = position ?? {};
  const { name: status_name, color: status_color } = status ?? {};

  const profile_photo = profile_photo_url ?? rank_image_url ?? null;

  return (
    <Card className="w-full justify-start p-6 md:w-1/3">
      <div className="flex items-center justify-between">
        <h5 className="text-xl font-bold">Personnel Profile</h5>
        {status && (
          <span
            className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${status_color}`}
          >
            {status_name}
          </span>
        )}
      </div>
      <div className="flex flex-grow flex-col items-center justify-center space-y-4 py-4">
        {profile_photo && <Image src={profile_photo} className="h-28 rounded" alt={name} />}
        <div className="flex flex-col items-center justify-center text-center">
          <div className="font-bold">
            {rank_abbreviation} {name} {'  '}
          </div>
          {rank_name && <div className="font-medium">{rank_name}</div>}{' '}
          {position_name && <div className="font-light">{position_name}</div>}
        </div>
      </div>
    </Card>
  );
}

function Demographics({ user }) {
  const { name, rank, position, online, unit, specialty } = user;
  const { name: rank_name } = rank ?? {};
  const { name: position_name } = position ?? {};
  const { name: specialty_name } = specialty ?? {};
  const { name: unit_name } = unit ?? {};

  return (
    <Card className="w-full justify-start p-6 md:w-2/3">
      <div className="flex items-center justify-between">
        <h5 className="text-xl font-bold tracking-tight">Demographics</h5>
        {online ? (
          <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-600">
            Online
          </span>
        ) : (
          <span className="bg-sky-100 text-sky-600 inline-flex rounded-full px-2 text-xs font-semibold leading-5">
            Offline
          </span>
        )}
      </div>
      <div className="flow-root">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          <li className="py-2">
            <p className="truncate text-sm font-semibold">Name</p>
            <p className="truncate text-sm">{name}</p>
          </li>
          <li className="py-2">
            <p className="truncate text-sm font-semibold">Rank</p>
            <p className="truncate text-sm">{rank_name}</p>
          </li>
          <li className="py-2">
            <p className="truncate text-sm font-semibold">Primary Position</p>
            <p className="truncate text-sm">{position_name}</p>
          </li>
          <li className="py-2">
            <p className="truncate text-sm font-semibold">Primary Specialty</p>
            <p className="truncate text-sm">{specialty_name}</p>
          </li>
          <li className="py-2">
            <p className="truncate text-sm font-semibold">Primary Unit</p>
            <p className="truncate text-sm">{unit_name}</p>
          </li>
        </ul>
      </div>
    </Card>
  );
}

function AdditionalFields({ fields }) {
  return (
    <>
      {fields && !!fields.length && (
        <Card className="p-6">
          <h5 className="text-xl font-bold">Additional Information</h5>
          <div className="flow-root">
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {fields.map(function (field) {
                return (
                  <li key={field.key} className="py-2">
                    <p className="truncate text-sm font-semibold">{field.name}</p>
                    <p className="text-sm">
                      <FieldValue field={field} value={get(user, field.key, '')} />
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>
        </Card>
      )}
    </>
  );
}

function SecondaryAssignments({ user }) {
  const tabs = [
    {
      name: 'Secondary Positions',
      data: user?.secondary_positions ?? [],
      emptyMessage: 'There are no secondary positions to display.',
      columns: [
        {
          name: 'Position',
          selector: 'name',
          sortable: true
        }
      ]
    },
    {
      name: 'Secondary Specialties',
      data: user?.secondary_specialties ?? [],
      emptyMessage: 'There are no secondary specialties to display.',
      columns: [
        {
          name: 'Specialty',
          selector: 'name',
          sortable: true
        }
      ]
    },
    {
      name: 'Secondary Units',
      data: user?.secondary_units ?? [],
      emptyMessage: 'There are no secondary units to display.',
      columns: [
        {
          name: 'Unit',
          selector: 'name',
          sortable: true
        }
      ]
    }
  ];

  return (
    <Card className="p-6">
      <h5 className="text-xl font-bold">Assignments</h5>
      <Tabs style="underline">
        {tabs.map((tab, index) => (
          <TabItem key={index} title={tab.name}>
            <div className="py-4">
              <Datatable
                key={index}
                columns={tabs[index].columns}
                data={tabs[index].data}
                pagination={true}
                progressPending={!tabs[index].data}
                highlightOnHover={true}
                defaultSortFieldId={1}
                responsive={true}
                paginationComponentOptions={{
                  noRowsPerPage: true
                }}
                emptyMessage={tabs[index].emptyMessage}
                customStyles={{
                  cells: {
                    style: {
                      marginTop: '0.5rem',
                      marginBottom: '0.5rem'
                    }
                  }
                }}
              />
            </div>
          </TabItem>
        ))}
      </Tabs>
    </Card>
  );
}

function Records({ user }) {
  const tabs = [
    {
      name: 'Assignment Records',
      data: user?.assignment_records ?? [],
      columns: [
        {
          name: 'Date',
          selector: <AssignmentRecordDateColumn />,
          sortable: true,
          maxWidth: '250px'
        },
        {
          name: 'Assignment',
          // selector: (row) => {
          //   const { unit, position, specialty, text } = row
          //   const { name: unit_name } = unit ?? {}
          //   const { name: position_name } = position ?? {}
          //   const { name: specialty_name } = specialty ?? {}
          //   return (
          //       <div className='flex flex-col space-y-1 justify-center'>
          //         <div className='font-semibold'>
          //           {position_name}, {unit_name}
          //         </div>
          //         {specialty_name && <div className='text-xs'>{specialty_name}</div>}
          //         {text && <div className='text-xs'>{text}</div>}
          //       </div>
          //   )
          // },
          sortable: true
          // sortFunction: (rowA, rowB) => {
          //   const a = rowA.position?.name ?? ''
          //   const b = rowB.position?.name ?? ''
          //
          //   if (a > b) {
          //     return 1
          //   }
          //
          //   if (b > a) {
          //     return -1
          //   }
          //
          //   return 0
          // }
        }
      ]
    }
    // {
    //   name: 'Award Records',
    //   data: user?.award_records ?? [],
    //   columns: [
    //     {
    //       name: 'Date',
    //       selector: (row) => Helpers.formatDate(row.created_at),
    //       sortable: true,
    //       maxWidth: '250px'
    //     },
    //     {
    //       name: 'Award',
    //       selector: (row) => {
    //         const { award, text } = row
    //         const { image, name } = award ?? {}
    //         const { image_url } = image ?? {}
    //         return (
    //             <div className='flex space-x-4'>
    //               {image_url && <img className='w-6 sm:w-8 font-bold' src={image_url} alt={name} />}
    //               <div className='flex flex-col space-y-1 justify-center'>
    //                 {name && <div className='font-semibold'>{name}</div>}
    //                 {text && <div className='text-xs'>{text}</div>}
    //               </div>
    //             </div>
    //         )
    //       },
    //       sortable: true,
    //       sortFunction: (rowA, rowB) => {
    //         const a = rowA.award?.name ?? ''
    //         const b = rowB.award?.name ?? ''
    //
    //         if (a > b) {
    //           return 1
    //         }
    //
    //         if (b > a) {
    //           return -1
    //         }
    //
    //         return 0
    //       }
    //     }
    //   ]
    // },
    // {
    //   name: 'Combat Records',
    //   data: user?.combat_records ?? [],
    //   columns: [
    //     {
    //       name: 'Date',
    //       selector: (row) => Helpers.formatDate(row.created_at),
    //       sortable: true,
    //       maxWidth: '250px'
    //     },
    //     {
    //       name: 'Record',
    //       selector: (row) => row.text
    //     }
    //   ]
    // },
    // {
    //   name: 'Qualification Records',
    //   data: user?.qualification_records ?? [],
    //   columns: [
    //     {
    //       name: 'Date',
    //       selector: (row) => Helpers.formatDate(row.created_at),
    //       sortable: true,
    //       maxWidth: '250px'
    //     },
    //     {
    //       name: 'Qualification',
    //       selector: (row) => {
    //         const { qualification, text } = row
    //         const { image, name } = qualification ?? {}
    //         const { image_url } = image ?? {}
    //         return (
    //             <div className='flex space-x-4'>
    //               {image_url && <img className='w-6 sm:w-8 font-bold' src={image_url} alt={name} />}
    //               <div className='flex flex-col space-y-1 justify-center'>
    //                 {name && <div className='font-semibold'>{name}</div>}
    //                 {text && <div className='text-xs'>{text}</div>}
    //               </div>
    //             </div>
    //         )
    //       },
    //       sortable: true,
    //       sortFunction: (rowA, rowB) => {
    //         const a = rowA.qualification?.name ?? ''
    //         const b = rowB.qualification?.name ?? ''
    //
    //         if (a > b) {
    //           return 1
    //         }
    //
    //         if (b > a) {
    //           return -1
    //         }
    //
    //         return 0
    //       }
    //     }
    //   ]
    // },
    // {
    //   name: 'Rank Records',
    //   data: user?.rank_records ?? [],
    //   columns: [
    //     {
    //       name: 'Date',
    //       selector: (row) => Helpers.formatDate(row.created_at),
    //       sortable: true,
    //       maxWidth: '250px'
    //     },
    //     {
    //       name: 'Rank',
    //       selector: (row) => {
    //         const { rank, text } = row
    //         const { image, name } = rank ?? {}
    //         const { image_url } = image ?? {}
    //         return (
    //             <div className='flex space-x-4'>
    //               {image_url && <img className='w-6 sm:w-8 font-bold' src={image_url} alt={name} />}
    //               <div className='flex flex-col space-y-1 justify-center'>
    //                 {name && <div className='font-semibold'>{name}</div>}
    //                 {text && <div className='text-xs'>{text}</div>}
    //               </div>
    //             </div>
    //         )
    //       },
    //       sortable: true,
    //       sortFunction: (rowA, rowB) => {
    //         const a = rowA.rank?.name ?? ''
    //         const b = rowB.rank?.name ?? ''
    //
    //         if (a > b) {
    //           return 1
    //         }
    //
    //         if (b > a) {
    //           return -1
    //         }
    //
    //         return 0
    //       }
    //     }
    //   ]
    // },
    // {
    //   name: 'Service Records',
    //   data: user?.service_records ?? [],
    //   columns: [
    //     {
    //       name: 'Date',
    //       selector: (row) => Helpers.formatDate(row.created_at),
    //       sortable: true,
    //       maxWidth: '250px'
    //     },
    //     {
    //       name: 'Record',
    //       selector: (row) => row.text
    //     }
    //   ]
    // }
  ];

  return (
    <Card className="p-6">
      <h5 className="text-xl font-bold">Records</h5>
      <Tabs style="underline">
        {tabs.map((tab, index) => (
          <TabItem key={index} title={tab.name}>
            <div className="py-4">
              <Datatable
                key={index}
                columns={tabs[index].columns}
                data={tabs[index].data}
                pagination={true}
                progressPending={!tabs[index].data}
                highlightOnHover={true}
                defaultSortFieldId={1}
                defaultSortAsc={false}
                responsive={true}
                paginationComponentOptions={{
                  noRowsPerPage: true
                }}
                customStyles={{
                  cells: {
                    style: {
                      marginTop: '0.5rem',
                      marginBottom: '0.5rem'
                    }
                  }
                }}
                // sortFunction={(rows, selector, direction) => {
                //   return rows.sort((rowA, rowB) => {
                //     const aField = new Date(selector(rowA))
                //     const bField = new Date(selector(rowB))
                //
                //     let comparison = 0
                //
                //     if (aField > bField) {
                //       comparison = 1
                //     } else if (aField < bField) {
                //       comparison = -1
                //     }
                //
                //     return direction === 'desc' ? comparison * -1 : comparison
                //   })
                // }}
              />
            </div>
          </TabItem>
        ))}
      </Tabs>
    </Card>
  );
}
