'use client';

import { Card } from '@/components/card';
import { Datatable } from '@/components/datatable';
import { Tabs } from '@/components/tabs';
import { DateHelper } from '@/lib/date';
import { Badge, TabItem } from 'flowbite-react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

export function Records({ user }) {
  const searchParams = useSearchParams();
  const timezone = searchParams.get('timezone') ?? 'UTC';

  const tabs = [
    {
      name: 'Assignment Records',
      data: user?.assignment_records ?? [],
      emptyMessage: 'There are no assignment records to display.',
      columns: [
        {
          name: 'Date',
          selector: (row) => {
            const date = new DateHelper(row.created_at, timezone);

            return date.toHtml();
          },
          sortable: true,
          maxWidth: '250px'
        },
        {
          name: 'Type',
          selector: (row) => {
            return row.type === 'primary' ? (
              <Badge color="success">Primary</Badge>
            ) : (
              <Badge color="info">Secondary</Badge>
            );
          },
          maxWidth: '200px'
        },
        {
          name: 'Assignment',
          selector: (row) => {
            const { unit, position, specialty, status, text } = row;
            const { name: unit_name } = unit ?? {};
            const { name: position_name } = position ?? {};
            const { name: specialty_name } = specialty ?? {};
            const { name: status_name } = status ?? {};

            return (
              <div className="flex flex-col justify-center space-y-1">
                {position_name && (
                  <div className="first:font-semibold [&:not(:first-child)]:text-xs">
                    {position_name}
                  </div>
                )}
                {specialty_name && (
                  <div className="first:font-semibold [&:not(:first-child)]:text-xs">
                    {specialty_name}
                  </div>
                )}
                {unit_name && (
                  <div className="first:font-semibold [&:not(:first-child)]:text-xs">
                    {unit_name}
                  </div>
                )}
                {status_name && (
                  <div className="first:font-semibold [&:not(:first-child)]:text-xs">
                    {status_name}
                  </div>
                )}
                {text && <div className="text-xs" dangerouslySetInnerHTML={{ __html: text }}></div>}
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
          selector: (row) => {
            const date = new DateHelper(row.created_at, timezone);

            return date.toHtml();
          },
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
              <div className="flex items-center space-x-4">
                {image_url && (
                  <div className="flex size-6 flex-1 flex-col justify-center sm:size-8">
                    <Image src={image_url} alt={name} width={64} height={20} />
                  </div>
                )}
                <div className="flex flex-col justify-center space-y-1">
                  {name && <div className="font-semibold">{name}</div>}
                  {text && (
                    <div className="text-xs" dangerouslySetInnerHTML={{ __html: text }}></div>
                  )}
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
          selector: (row) => {
            const date = new DateHelper(row.created_at, timezone);

            return date.toHtml();
          },
          sortable: true,
          maxWidth: '250px'
        },
        {
          name: 'Record',
          selector: (row) => {
            return <div className="text-xs" dangerouslySetInnerHTML={{ __html: row.text }}></div>;
          }
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
          selector: (row) => {
            const date = new DateHelper(row.created_at, timezone);

            return date.toHtml();
          },
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
              <div className="flex items-center space-x-4">
                {image_url && (
                  <div className="flex size-6 flex-1 flex-col justify-center sm:size-8">
                    <Image src={image_url} alt={name} width={64} height={20} />
                  </div>
                )}
                <div className="flex flex-col justify-center space-y-1">
                  {name && <div className="font-semibold">{name}</div>}
                  {text && (
                    <div className="text-xs" dangerouslySetInnerHTML={{ __html: text }}></div>
                  )}
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
          selector: (row) => {
            const date = new DateHelper(row.created_at, timezone);

            return date.toHtml();
          },
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
              <div className="flex items-center space-x-4">
                {image_url && (
                  <div className="flex size-6 flex-1 flex-col justify-center sm:size-8">
                    <Image src={image_url} alt={name} width={64} height={64} />
                  </div>
                )}
                <div className="flex flex-col justify-center space-y-1">
                  {name && <div className="font-semibold">{name}</div>}
                  {text && (
                    <div className="text-xs" dangerouslySetInnerHTML={{ __html: text }}></div>
                  )}
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
          selector: (row) => {
            const date = new DateHelper(row.created_at, timezone);

            return date.toHtml();
          },
          sortable: true,
          maxWidth: '250px'
        },
        {
          name: 'Record',
          selector: (row) => {
            return <div className="text-xs" dangerouslySetInnerHTML={{ __html: row.text }}></div>;
          }
        }
      ]
    }
  ];

  return (
    <Card className="p-4 sm:p-6">
      <h5 className="text-xl font-bold text-gray-950 dark:text-white">Records</h5>
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
