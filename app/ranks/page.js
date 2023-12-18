import Client from '../../api/client';
import Auth from '../../api/auth';
import Image from 'next/image';
import { TableHead, TableHeadCell, TableBody, TableRow, TableCell } from 'flowbite-react';
import { Pagination } from '../../components/pagination';
import { Table } from '../../components/table';
import { Card } from '../../components/card';

export const metadata = {
  title: 'Ranks'
};

export default async function Page({ searchParams }) {
  const ranks = await new Client(new Auth(searchParams)).getRanks();

  return (
    <Card>
      <Table>
        <TableHead className="text-center">
          <TableHeadCell colSpan="2">Ranks</TableHeadCell>
        </TableHead>
        <TableBody>
          {ranks.data &&
            !!ranks.data.length &&
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
            })}
        </TableBody>
      </Table>
      <Pagination meta={ranks.meta} searchParams={searchParams} />
    </Card>
  );
}
