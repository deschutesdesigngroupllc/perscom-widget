'use client';

import Image from 'next/image';
import { TabItem } from 'flowbite-react';
import { Card } from '../../../components/card';
import { Tabs } from '../../../components/tabs';
import { Datatable } from '../../../components/datatable';
import { formatDate } from '../../../utils/helpers';

export function Records({ user }) {
  const tabs = [
    {
      name: 'Assignment Records',
      data: user?.assignment_records ?? [],
      emptyMessage: 'There are no assignment records to display.',
      columns: [
        {
          name: 'Date',
          selector: (row) => formatDate(row.created_at),
          sortable: true,
          maxWidth: '250px'
        },
        {
          name: 'Assignment',
          selector: (row) => {
            const { unit, position, specialty, text } = row;
            const { name: unit_name } = unit ?? {};
            const { name: position_name } = position ?? {};
            const { name: specialty_name } = specialty ?? {};
            return (
              <div className="flex flex-col justify-center space-y-1">
                <div className="font-semibold">
                  {position_name}, {unit_name}
                </div>
                {specialty_name && <div className="text-xs">{specialty_name}</div>}
                {text && <div className="text-xs">{text}</div>}
              </div>
            );
          },
          sortable: true,
          sortFunction: (rowA, rowB) => {
            const a = rowA.position?.name ?? '';
            const b = rowB.position?.name ?? '';

            if (a > b) {
              return 1;
            }

            if (b > a) {
              return -1;
            }

            return 0;
          }
        }
      ]
    },
    {
      name: 'Award Records',
      data: user?.award_records ?? [],
      emptyMessage: 'There are no award records to display.',
      columns: [
        {
          name: 'Date',
          selector: (row) => formatDate(row.created_at),
          sortable: true,
          maxWidth: '250px'
        },
        {
          name: 'Award',
          selector: (row) => {
            const { award, text } = row;
            const { image, name } = award ?? {};
            const { image_url } = image ?? {};
            return (
              <div className="flex space-x-4">
                {image_url && (
                  <div className="relative h-6 w-6 sm:h-8 sm:w-8">
                    <Image src={image_url} alt={name} fill objectFit="contain" />
                  </div>
                )}
                <div className="flex flex-col justify-center space-y-1">
                  {name && <div className="font-semibold">{name}</div>}
                  {text && <div className="text-xs">{text}</div>}
                </div>
              </div>
            );
          },
          sortable: true,
          sortFunction: (rowA, rowB) => {
            const a = rowA.award?.name ?? '';
            const b = rowB.award?.name ?? '';

            if (a > b) {
              return 1;
            }

            if (b > a) {
              return -1;
            }

            return 0;
          }
        }
      ]
    },
    {
      name: 'Combat Records',
      data: user?.combat_records ?? [],
      emptyMessage: 'There are no combat records to display.',
      columns: [
        {
          name: 'Date',
          selector: (row) => formatDate(row.created_at),
          sortable: true,
          maxWidth: '250px'
        },
        {
          name: 'Record',
          selector: (row) => row.text
        }
      ]
    },
    {
      name: 'Qualification Records',
      data: user?.qualification_records ?? [],
      emptyMessage: 'There are no qualification records to display.',
      columns: [
        {
          name: 'Date',
          selector: (row) => formatDate(row.created_at),
          sortable: true,
          maxWidth: '250px'
        },
        {
          name: 'Qualification',
          selector: (row) => {
            const { qualification, text } = row;
            const { image, name } = qualification ?? {};
            const { image_url } = image ?? {};
            return (
              <div className="flex space-x-4">
                {image_url && (
                  <div className="relative h-6 w-6 sm:h-8 sm:w-8">
                    <Image src={image_url} alt={name} fill objectFit="contain" />
                  </div>
                )}
                <div className="flex flex-col justify-center space-y-1">
                  {name && <div className="font-semibold">{name}</div>}
                  {text && <div className="text-xs">{text}</div>}
                </div>
              </div>
            );
          },
          sortable: true,
          sortFunction: (rowA, rowB) => {
            const a = rowA.qualification?.name ?? '';
            const b = rowB.qualification?.name ?? '';

            if (a > b) {
              return 1;
            }

            if (b > a) {
              return -1;
            }

            return 0;
          }
        }
      ]
    },
    {
      name: 'Rank Records',
      data: user?.rank_records ?? [],
      emptyMessage: 'There are no rank records to display.',
      columns: [
        {
          name: 'Date',
          selector: (row) => formatDate(row.created_at),
          sortable: true,
          maxWidth: '250px'
        },
        {
          name: 'Rank',
          selector: (row) => {
            const { rank, text } = row;
            const { image, name } = rank ?? {};
            const { image_url } = image ?? {};
            return (
              <div className="flex space-x-4">
                {image_url && (
                  <div className="relative h-6 w-6 sm:h-8 sm:w-8">
                    <Image src={image_url} alt={name} fill objectFit="contain" />
                  </div>
                )}
                <div className="flex flex-col justify-center space-y-1">
                  {name && <div className="font-semibold">{name}</div>}
                  {text && <div className="text-xs">{text}</div>}
                </div>
              </div>
            );
          },
          sortable: true,
          sortFunction: (rowA, rowB) => {
            const a = rowA.rank?.name ?? '';
            const b = rowB.rank?.name ?? '';

            if (a > b) {
              return 1;
            }

            if (b > a) {
              return -1;
            }

            return 0;
          }
        }
      ]
    },
    {
      name: 'Service Records',
      data: user?.service_records ?? [],
      emptyMessage: 'There are no service records to display.',
      columns: [
        {
          name: 'Date',
          selector: (row) => formatDate(row.created_at),
          sortable: true,
          maxWidth: '250px'
        },
        {
          name: 'Record',
          selector: (row) => row.text
        }
      ]
    }
  ];

  return (
    <Card className="p-6">
      <h5 className="text-xl font-bold">Records</h5>
      <Tabs style="underline">
        {tabs.map((tab, index) => (
          <TabItem key={index} title={tab.name}>
            <div className="pt-4">
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
                emptyMessage={tabs[index].emptyMessage}
                customStyles={{
                  cells: {
                    style: {
                      marginTop: '0.5rem',
                      marginBottom: '0.5rem'
                    }
                  }
                }}
                sortFunction={(rows, selector, direction) => {
                  return rows.sort((rowA, rowB) => {
                    const aField = new Date(selector(rowA));
                    const bField = new Date(selector(rowB));

                    let comparison = 0;

                    if (aField > bField) {
                      comparison = 1;
                    } else if (aField < bField) {
                      comparison = -1;
                    }

                    return direction === 'desc' ? comparison * -1 : comparison;
                  });
                }}
              />
            </div>
          </TabItem>
        ))}
      </Tabs>
    </Card>
  );
}
