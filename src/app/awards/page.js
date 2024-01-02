import { TableBody, TableCell, TableHead, TableHeadCell, TableRow } from 'flowbite-react';
import Image from 'next/image';
import Auth from '../../api/auth';
import Client from '../../api/client';
import { Card } from '../../components/card';
import { Pagination } from '../../components/pagination';
import { Table } from '../../components/table';

export const dynamic = 'force-dynamic';
export const metadata = {
  title: 'Awards'
};

export default async function Page({ searchParams }) {
  const awards = await new Client(new Auth(searchParams)).getAwards();

  return (
    <Card>
      <Table>
        <TableHead className="text-center">
          <TableHeadCell colSpan="2">Awards</TableHeadCell>
        </TableHead>
        <TableBody>
          {awards.data && !!awards.data.length ? (
            awards.data.map((award) => {
              return (
                <TableRow key={award.id} data-testid={award.name}>
                  <TableCell className="hidden w-1/6 !py-4 sm:table-cell">
                    {award.image?.image_url ? (
                      <div className="relative mx-auto h-20">
                        <Image
                          src={award.image.image_url}
                          alt={award.name}
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
                      {award.image?.image_url && (
                        <div className="relative mb-2 flex h-12 sm:hidden">
                          <Image
                            className="!w-auto"
                            src={award.image.image_url}
                            alt={award.name}
                            fill
                            objectFit="contain"
                          />
                        </div>
                      )}
                      <div className="mb-2 text-sm font-semibold">{award.name}</div>
                      <div className="text-sm">{award.description}</div>
                    </>
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <div className="flex items-center justify-center p-8 text-sm">
              There are no awards to view.
            </div>
          )}
        </TableBody>
      </Table>
      <Pagination meta={awards.meta} />
    </Card>
  );
}
