import { TabItem } from 'flowbite-react';
import { Alert } from '../../../components/alert';
import { Card } from '../../../components/card';
import { Tabs } from '../../../components/tabs';
import Client from '../../../lib/client';
import { RequestError } from '../../../lib/request-error';
import { Unit } from './_components/unit';

export const dynamic = 'force-dynamic';
export const metadata = {
  title: 'Roster'
};

export default async function Page() {
  let roster = {};
  try {
    roster = await new Client().getRoster();
  } catch (error) {
    if (error instanceof RequestError) {
      return <Alert type="failure">{error.message}</Alert>;
    }
  }

  return (
    <Card>
      <Tabs style="underline">
        {roster?.data && !!roster.data.length ? (
          roster.data.map((group, index) => (
            <TabItem key={index} title={group.name}>
              <>
                {group.units && !!group.units.length ? (
                  group.units.map((unit) => {
                    return <Unit key={unit.id} unit={unit} />;
                  })
                ) : (
                  <div className="flex items-center justify-center p-8 text-xs text-gray-700 dark:text-gray-400">
                    There are no units assigned to this group.
                  </div>
                )}
              </>
            </TabItem>
          ))
        ) : (
          <TabItem key="none" title="No Groups">
            <div className="flex items-center justify-center p-8 text-xs text-gray-700 dark:text-gray-400">
              There are no groups to view.
            </div>
          </TabItem>
        )}
      </Tabs>
    </Card>
  );
}
