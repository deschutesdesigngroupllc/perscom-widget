import { TableBody, TableCell, TableHead, TableHeadCell, TableRow } from 'flowbite-react';
import Image from 'next/image';
import Auth from '../../api/auth';
import Client from '../../api/client';
import { Card } from '../../components/card';
import { Pagination } from '../../components/pagination';
import { Table } from '../../components/table';

export const dynamic = 'force-dynamic';
export const metadata = {
  title: 'Qualifications'
};

export default async function Page({ searchParams }) {
  const qualifications = await new Client(new Auth(searchParams)).getQualifications();

  return (
    <Card>
      <Table>
        <TableHead className="text-center">
          <TableHeadCell colSpan="2">Qualifications</TableHeadCell>
        </TableHead>
        <TableBody>
          {qualifications.data && !!qualifications.data.length ? (
            qualifications.data.map((qualification) => {
              return (
                <TableRow key={qualification.id}>
                  <TableCell className="hidden w-1/6 !py-4 sm:table-cell">
                    {qualification.image?.image_url ? (
                      <div className="relative mx-auto h-20 w-28">
                        <Image
                          src={qualification.image.image_url}
                          alt={qualification.name}
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
                      {qualification.image?.image_url && (
                        <div className="relative mb-2 flex h-12 sm:hidden">
                          <Image
                            className="!w-auto"
                            src={qualification.image.image_url}
                            alt={qualification.name}
                            fill
                            objectFit="contain"
                          />
                        </div>
                      )}
                      <div className="mb-2 text-sm font-semibold">{qualification.name}</div>
                      <div className="text-sm">{qualification.description}</div>
                    </>
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <div className="flex items-center justify-center p-8 text-sm">
              There are no qualifications to view.
            </div>
          )}
        </TableBody>
      </Table>
      <Pagination meta={qualifications.meta} />
    </Card>
  );
}
