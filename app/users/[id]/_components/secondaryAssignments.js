'use client';

import { TabItem } from 'flowbite-react';
import { Card } from '../../../../components/card';
import { Tabs } from '../../../../components/tabs';
import { Datatable } from '../../../../components/datatable';

export function SecondaryAssignments({ user }) {
  const tabs = [
    {
      name: 'Secondary Positions',
      data: user?.secondary_positions ?? [],
      emptyMessage: 'There are no secondary positions to display.',
      columns: [
        {
          name: 'Position',
          selector: (row) => row.name,
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
          selector: (row) => row.name,
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
          selector: (row) => row.name,
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
            <div className="pt-4">
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
