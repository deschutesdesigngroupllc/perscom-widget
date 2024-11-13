'use client';

import { Card } from '@/components/card';
import { Datatable } from '@/components/datatable';
import { Tabs } from '@/components/tabs';
import { DateHelper } from '@/lib/date';
import { TabItem } from 'flowbite-react';
import { useSearchParams } from 'next/navigation';

export function Assignment({ user }) {
  const { position, unit, specialty, secondary_assignment_records, last_assignment_change_date } =
    user;
  const { name: position_name } = position ?? {};
  const { name: specialty_name } = specialty ?? {};
  const { name: unit_name } = unit ?? {};

  const searchParams = useSearchParams();
  const timezone = searchParams.get('timezone') ?? 'UTC';

  const lastAssignmentChangeDate = new DateHelper(last_assignment_change_date, timezone);
  const timeInAssignment = lastAssignmentChangeDate.diffFrom(new Date().toDateString());

  return (
    <Card className="p-4 sm:p-6">
      <h5 className="text-xl font-bold text-gray-950 dark:text-white">Assignment</h5>
      <Tabs style="underline">
        <TabItem key="primary-assignment" title="Primary Assignment">
          <div className="flow-root">
            <ul className="mt-4 divide-y divide-gray-200 dark:divide-gray-700">
              <li className="py-2">
                <p className="truncate text-xs font-semibold text-gray-950 dark:text-white">
                  Position
                </p>
                <p className="truncate text-xs text-gray-700 dark:text-gray-400">{position_name}</p>
              </li>
              <li className="py-2">
                <p className="truncate text-xs font-semibold text-gray-950 dark:text-white">
                  Specialty
                </p>
                <p className="truncate text-xs text-gray-700 dark:text-gray-400">
                  {specialty_name}
                </p>
              </li>
              <li className="py-2">
                <p className="truncate text-xs font-semibold text-gray-950 dark:text-white">Unit</p>
                <p className="truncate text-xs text-gray-700 dark:text-gray-400">{unit_name}</p>
              </li>
              <li className="py-2">
                <p className="truncate text-xs font-semibold text-gray-950 dark:text-white">
                  Last Assignment Change Date
                </p>
                <p className="truncate text-xs text-gray-700 dark:text-gray-400">
                  {lastAssignmentChangeDate.toHtml()}
                </p>
              </li>
              <li className="py-2">
                <p className="truncate text-xs font-semibold text-gray-950 dark:text-white">
                  Time In Assignment
                </p>
                <p className="truncate text-xs text-gray-700 dark:text-gray-400">
                  {timeInAssignment}
                </p>
              </li>
            </ul>
          </div>
        </TabItem>
        <TabItem key="secondary-assignments" title="Secondary Assignments">
          <div className="pt-4">
            <Datatable
              key="secondary-assignments"
              columns={[
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
                  name: 'Status',
                  selector: (row) => row.status?.name,
                  sortable: true,
                  maxWidth: '200px'
                },
                {
                  name: 'Position',
                  selector: (row) => row.position?.name,
                  sortable: true,
                  maxWidth: '200px'
                },
                {
                  name: 'Specialty',
                  selector: (row) => row.specialty?.name,
                  sortable: true,
                  maxWidth: '200px'
                },
                {
                  name: 'Unit',
                  selector: (row) => row.unit?.name,
                  sortable: true,
                  maxWidth: '200px'
                }
              ]}
              data={secondary_assignment_records}
              pagination={true}
              progressPending={!secondary_assignment_records}
              highlightOnHover={true}
              defaultSortFieldId={1}
              responsive={true}
              paginationComponentOptions={{
                noRowsPerPage: true
              }}
              emptyMessage="There are no secondary assignments to display."
            />
          </div>
        </TabItem>
      </Tabs>
    </Card>
  );
}
