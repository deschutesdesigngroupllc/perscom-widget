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
          colSpan="5"
          className="text-center group-first/head:last:rounded-tl-none group-first/head:last:rounded-tr-none"
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
                <TableCell className="w-1/2 whitespace-normal !py-3 sm:whitespace-nowrap">
                  <div className="flex items-center space-x-1 text-xs sm:space-x-2">
                    {rank && (
                      <div className="flex w-8 flex-shrink-0 items-center">
                        {image_url ? (
                          <div className="relative h-8 w-8">
                            <Image src={image_url} alt={rank_name} fill objectFit="contain" />
                          </div>
                        ) : (
                          <div className="text-xs">{abbreviation}</div>
                        )}
                      </div>
                    )}
                    <div className="flex-1">
                      <Link
                        href={`/users/${user_id}`}
                        className="text-nowrap text-xs font-bold text-gray-950 dark:text-white dark:hover:text-gray-300"
                      >
                        {name}
                      </Link>
                      <div className="flex flex-row items-center space-x-0.5 sm:space-x-1">
                        {specialty_name && (
                          <div className="text-nowrap font-medium text-gray-700 dark:text-gray-400">
                            {specialty_name}
                          </div>
                        )}
                        {position_name && (
                          <>
                            <div className="block">
                              <svg
                                viewBox="0 0 2 2"
                                className="mx-2 inline h-0.5 w-0.5 fill-current"
                                aria-hidden="true"
                              >
                                <circle cx="1" cy="1" r="1" />
                              </svg>
                            </div>
                            <div className="text-nowrap text-gray-500">{position_name}</div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="table-cell w-1/2 !py-3 text-center">
                  <div className="flex flex-row justify-end space-x-2">
                    {status && <Status text={status.name} color={status.color} />}
                    <div className="hidden sm:block">
                      {online ? (
                        <Status text={'Online'} color={'#16a34a'} />
                      ) : (
                        <Status text={'Offline'} color={'#0284c7'} />
                      )}
                    </div>
                  </div>
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
