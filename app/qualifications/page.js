import Client from '../../api/client';
import Auth from '../../api/auth';
import Image from 'next/image';
import { TableHead, TableHeadCell, TableBody, TableRow, TableCell } from 'flowbite-react';
import { Pagination } from '../../components/pagination';
import { Table } from '../../components/table';
import { Card } from '../../components/card';

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
          {qualifications.data.map((qualification) => {
            return (
              <TableRow key={qualification.id}>
                <TableCell className="hidden w-1/6 !py-4 sm:table-cell">
                  {qualification.image?.image_url ? (
                    <Image
                      className="mx-auto block w-28"
                      src={qualification.image.image_url}
                      alt={qualification.name}
                    />
                  ) : (
                    <div className="text-center font-medium">No Image</div>
                  )}
                </TableCell>
                <TableCell className="!whitespace-normal break-normal !py-4">
                  <>
                    {qualification.image?.image_url && (
                      <div className="mb-2 flex sm:hidden">
                        <Image
                          className="w-20"
                          src={qualification.image.image_url}
                          alt={qualification.name}
                        />
                      </div>
                    )}
                    <div className="mb-2 text-sm font-semibold">{qualification.name}</div>
                    <div className="text-sm">{qualification.description}</div>
                  </>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <Pagination meta={qualifications.meta} searchParams={searchParams} />
    </Card>
  );
}
