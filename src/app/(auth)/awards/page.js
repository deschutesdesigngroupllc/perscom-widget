import { Alert } from '@/components/alert';
import { Card } from '@/components/card';
import { Pagination } from '@/components/pagination';
import { Table } from '@/components/table';
import Client from '@/lib/client';
import { RequestError } from '@/lib/request-error';
import { TableBody, TableCell, TableHead, TableHeadCell, TableRow } from 'flowbite-react';

export const dynamic = 'force-dynamic';
export const metadata = {
  title: 'Awards'
};

export default async function Page({ searchParams }) {
  let awards;
  try {
    awards = await new Client().getAwards(searchParams);
  } catch (error) {
    if (error instanceof RequestError) {
      return <Alert type="failure">{error.message}</Alert>;
    }
  }

  return (
    <Card>
      <Table>
        <TableHead className="text-center">
          <TableHeadCell colSpan="2">Awards</TableHeadCell>
        </TableHead>
        <TableBody>
          {awards?.data && !!awards.data.length ? (
            awards.data.map((award) => {
              return (
                <TableRow key={award.id} data-testid={award.name}>
                  <TableCell className="hidden w-1/6 !py-4 sm:table-cell">
                    {award.image?.image_url ? (
                      <div className="relative mx-auto flex size-20 items-center justify-center">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={award.image.image_url}
                          alt={award.name}
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
                      {award.image?.image_url && (
                        <div className="relative mb-2 flex size-8 sm:hidden">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={award.image.image_url}
                            alt={award.name}
                            width={32}
                            height={32}
                            className="h-full w-full object-contain"
                          />
                        </div>
                      )}
                      <div className="text-sm font-semibold text-gray-950 dark:text-white">
                        {award.name}
                      </div>
                      {award.description && (
                        <div
                          className="mt-2 text-xs text-gray-700 dark:text-gray-400"
                          dangerouslySetInnerHTML={{ __html: award.description }}
                        ></div>
                      )}
                    </>
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <div className="flex items-center justify-center p-8 text-xs text-gray-700 dark:text-gray-400">
              There are no awards to view.
            </div>
          )}
        </TableBody>
      </Table>
      {awards?.meta && <Pagination meta={awards.meta} />}
    </Card>
  );
}
