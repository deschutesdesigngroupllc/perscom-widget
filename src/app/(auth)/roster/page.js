import { TabItem, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from 'flowbite-react';
import Image from 'next/image';
import { Card } from '../../../components/card';
import { Link } from '../../../components/link';
import { Table } from '../../../components/table';
import { Tabs } from '../../../components/tabs';
import Client from '../../../lib/client';

export const dynamic = 'force-dynamic';
export const metadata = {
  title: 'Roster'
};

export default async function Page() {
  const groups = await new Client().getGroups();

  return (
    <Card>
      <Tabs style="underline">
        {groups.data &&
          !!groups.data.length &&
          groups.data.map((group, index) => (
            <TabItem key={index} title={group.name}>
              <>
                {group.units && !!group.units.length ? (
                  group.units.map((unit) => {
                    return <Unit key={unit.id} unit={unit} />;
                  })
                ) : (
                  <div className="flex items-center justify-center p-8 text-sm">
                    There are no units assigned to this group.
                  </div>
                )}
              </>
            </TabItem>
          ))}
      </Tabs>
    </Card>
  );
}

function Unit({ unit }) {
  const { name, users } = unit;

  return (
    <Table>
      <TableHead>
        <TableHeadCell
          data-testid={name}
          colSpan="6"
          className="group-first/head:last:rounded-tl-none group-first/head:last:rounded-tr-none"
        >
          {name}
        </TableHeadCell>
      </TableHead>
      <TableBody>
        {users.length ? (
          users.map((user) => {
            const { name, rank, online, position, specialty, status, id: user_id } = user;
            const { image, abbreviation, name: rank_name } = rank ?? {};
            const { image_url } = image ?? {};
            const { name: position_name } = position ?? {};
            const { name: specialty_name } = specialty ?? {};

            return (
              <TableRow key={user.id} data-testid={name}>
                <TableCell className="w-1/6 whitespace-normal !py-3 sm:whitespace-nowrap">
                  <div className="flex items-center">
                    {rank && (
                      <div className="flex w-6 flex-shrink-0 items-center sm:w-8">
                        {image_url ? (
                          <div className="relative h-8 w-8">
                            <Image src={image_url} alt={rank_name} fill objectFit="contain" />
                          </div>
                        ) : (
                          <div className="text-sm font-bold">{abbreviation}</div>
                        )}
                      </div>
                    )}
                    <div className="ml-4 flex flex-col">
                      <Link href={`/users/${user_id}`} className="text-sm font-semibold">
                        {name}
                      </Link>
                      <div className="text-xs md:hidden">{position_name}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="hidden w-1/6 whitespace-normal !py-3 md:table-cell lg:whitespace-nowrap">
                  {position_name}
                </TableCell>
                <TableCell className="hidden w-1/6 whitespace-normal !py-3 md:table-cell lg:whitespace-nowrap">
                  {specialty_name}
                </TableCell>
                <TableCell className="w-1/12 whitespace-nowrap !py-3 text-right md:text-center">
                  <>
                    {status && (
                      <span
                        className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${status.color}`}
                      >
                        {status.name}
                      </span>
                    )}
                  </>
                </TableCell>
                <TableCell className="hidden w-1/12 !py-3 text-center lg:table-cell">
                  <>
                    {online ? (
                      <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-600">
                        Online
                      </span>
                    ) : (
                      <span className="inline-flex rounded-full bg-sky-100 px-2 text-xs font-semibold leading-5 text-sky-600">
                        Offline
                      </span>
                    )}
                  </>
                </TableCell>
              </TableRow>
            );
          })
        ) : (
          <div className="flex items-center justify-center p-8 text-sm">
            There are no personnel assigned to this unit.
          </div>
        )}
      </TableBody>
    </Table>
  );
}
