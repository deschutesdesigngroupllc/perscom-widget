import Client from '../../api/client';
import Auth from '../../api/auth';
import Link from 'next/link';
import Image from 'next/image';
import { TableHead, TableHeadCell, TableBody, TableRow, TableCell, TabItem } from 'flowbite-react';
import { Card } from '../../components/card';
import { Table } from '../../components/table';
import { Tabs } from '../../components/tabs';

export const metadata = {
  title: 'Roster'
};

export default async function Page({ searchParams }) {
  const groups = await new Client(new Auth(searchParams)).getGroups();

  return (
    <Card>
        <div>test 123</div>
      <Tabs style="underline">
        {groups.data.map((group, index) => (
          <TabItem key={index} title={group.name}>
            {group.units && !!group.units.length ? (
              group.units.map((unit) => {
                return <Unit key={unit.id} unit={unit} />;
              })
            ) : (
              <div className="flex items-center justify-center py-4 text-sm">
                No Units Assigned To Group
              </div>
            )}
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
        {users.map((user) => {
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
                        <Image className="w-6 font-bold sm:w-8" src={image_url} alt={rank_name} />
                      ) : (
                        <div className="text-sm font-bold">{abbreviation}</div>
                      )}
                    </div>
                  )}
                  <div className="ml-4 flex flex-col">
                    <Link
                      href={`/users/${user_id}`}
                      className="text-sm font-semibold hover:text-gray-600 active:text-blue-600"
                    >
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
                {position_name}
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
        })}
      </TableBody>
    </Table>
  );
}
