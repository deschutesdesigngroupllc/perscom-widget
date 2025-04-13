import { Alert } from '@/components/alert';
import { Card } from '@/components/card';
import { Pagination } from '@/components/pagination';
import { Table } from '@/components/table';
import Client from '@/lib/client';
import { RequestError } from '@/lib/request-error';
import { TableBody, TableCell, TableHead, TableHeadCell, TableRow } from 'flowbite-react';

export const dynamic = 'force-dynamic';
export const metadata = {
  title: 'Ranks'
};

export default async function Page({ searchParams }) {
  let ranks = {};
  try {
    ranks = await new Client().getRanks(searchParams);
  } catch (error) {
    if (error instanceof RequestError) {
      return <Alert type="failure">{error.message}</Alert>;
    }
  }

  return (
    <Card>
      <Table>
        <TableHead className="text-center">
          <TableHeadCell colSpan="2">Ranks</TableHeadCell>
        </TableHead>
        <TableBody>
          {ranks?.data && !!ranks.data.length ? (
            ranks.data.map((rank) => {
              return (
                <TableRow key={rank.id}>
                  <TableCell className="hidden w-1/6 !py-4 sm:table-cell">
                    {rank.image?.image_url ? (
                      <div className="relative mx-auto flex size-20 items-center justify-center">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={rank.image.image_url}
                          alt={rank.name}
                          width={80}
                          height={80}
                          className="h-full w-full object-contain"
                        />
                      </div>
                    ) : (
                      <div className="text-center text-xs font-medium text-gray-700 dark:text-gray-400">
                        No Image
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="!whitespace-normal break-normal !py-4">
                    <>
                      {rank.image?.image_url && (
                        <div className="relative mb-2 flex size-8 sm:hidden">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={rank.image.image_url}
                            alt={rank.name}
                            width={32}
                            height={32}
                            className="h-full w-full object-contain"
                          />
                        </div>
                      )}
                      <div className="text-sm font-semibold text-gray-950 dark:text-white">
                        {rank.name}
                      </div>
                      {rank.description && (
                        <div
                          className="mt-2 text-xs text-gray-700 dark:text-gray-400"
                          dangerouslySetInnerHTML={{ __html: rank.description }}
                        ></div>
                      )}
                    </>
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <div className="flex items-center justify-center p-8 text-xs text-gray-700 dark:text-gray-400">
              There are no ranks to view.
            </div>
          )}
        </TableBody>
      </Table>
      {ranks?.meta && <Pagination meta={ranks.meta} />}
    </Card>
  );
}
