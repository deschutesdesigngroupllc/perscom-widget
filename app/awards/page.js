import Client from '../../api/client';
import Auth from '../../api/auth';
import Image from 'next/image';
import { TableHead, TableHeadCell, TableBody, TableRow, TableCell } from 'flowbite-react';
import { Pagination } from '../../components/pagination';
import { Table } from '../../components/table';
import { Card } from '../../components/card';

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
          {awards.data.map((award) => {
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
          })}
        </TableBody>
      </Table>
      <Pagination meta={awards.meta} searchParams={searchParams} />
    </Card>
  );
}
