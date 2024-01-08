import { TableBody, TableCell, TableHead, TableHeadCell, TableRow } from 'flowbite-react';
import Image from 'next/image';
import { Alert } from '../../../components/alert';
import { Card } from '../../../components/card';
import { Pagination } from '../../../components/pagination';
import { Table } from '../../../components/table';
import Client from '../../../lib/client';
import { RequestError } from '../../../lib/request-error';

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
          {ranks.data && !!ranks.data.length ? (
            ranks.data.map((rank) => {
              return (
                <TableRow key={rank.id}>
                  <TableCell className="hidden w-1/6 !py-4 sm:table-cell">
                    {rank.image?.image_url ? (
                      <div className="relative mx-auto h-20">
                        <Image
                          src={rank.image.image_url}
                          alt={rank.name}
                          fill
                          objectFit="contain"
                        />
                      </div>
                    ) : (
                      <div className="text-center font-medium">No Image</div>
                    )}
                  </TableCell>
                  <TableCell className="!whitespace-normal break-normal !py-4">
                    <>
                      {rank.image?.image_url && (
                        <div className="relative mb-2 flex h-12 sm:hidden">
                          <Image
                            className="!w-auto"
                            src={rank.image.image_url}
                            alt={rank.name}
                            fill
                            objectFit="contain"
                          />
                        </div>
                      )}
                      <div className="mb-2 text-sm font-semibold">{rank.name}</div>
                      <div className="text-sm">{rank.description}</div>
                    </>
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <div className="flex items-center justify-center p-8 text-sm">
              There are no ranks to view.
            </div>
          )}
        </TableBody>
      </Table>
      <Pagination meta={ranks.meta} />
    </Card>
  );
}
