import { TableBody, TableCell, TableHead, TableHeadCell, TableRow } from 'flowbite-react';
import Image from 'next/image';
import { Link } from '../../../../components/link';
import { Status } from '../../../../components/status';
import { Table } from '../../../../components/table';

export function Unit({ unit }) {
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
                          <div className="text-xs font-bold">{abbreviation}</div>
                        )}
                      </div>
                    )}
                    <div className="ml-4 flex flex-col">
                      <Link
                        href={`/users/${user_id}`}
                        className="text-xs text-gray-950 dark:text-white dark:hover:text-gray-300"
                      >
                        {name}
                      </Link>
                      <div className="text-xs text-gray-700 dark:text-gray-400 md:hidden">
                        {position_name}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="hidden w-1/6 whitespace-normal !py-3 text-xs md:table-cell lg:whitespace-nowrap">
                  {position_name}
                </TableCell>
                <TableCell className="hidden w-1/6 whitespace-normal !py-3 text-xs md:table-cell lg:whitespace-nowrap">
                  {specialty_name}
                </TableCell>
                <TableCell className="w-1/12 whitespace-nowrap !py-3 text-right md:text-center">
                  <>{status && <Status text={status.name} color={status.color} />}</>
                </TableCell>
                <TableCell className="hidden w-1/12 !py-3 text-center lg:table-cell">
                  <>
                    {online ? (
                      <Status text={'Online'} color={'#16a34a'} />
                    ) : (
                      <Status text={'Offline'} color={'#0284c7'} />
                    )}
                  </>
                </TableCell>
              </TableRow>
            );
          })
        ) : (
          <div className="flex items-center justify-center p-8 text-xs">
            There are no personnel assigned to this unit.
          </div>
        )}
      </TableBody>
    </Table>
  );
}
