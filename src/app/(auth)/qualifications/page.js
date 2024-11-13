import { Alert } from '@/components/alert';
import { Card } from '@/components/card';
import { Pagination } from '@/components/pagination';
import { Table } from '@/components/table';
import Client from '@/lib/client';
import { RequestError } from '@/lib/request-error';
import { TableBody, TableCell, TableHead, TableHeadCell, TableRow } from 'flowbite-react';
import Image from 'next/image';

export const dynamic = 'force-dynamic';
export const metadata = {
  title: 'Qualifications'
};

export default async function Page({ searchParams }) {
  let qualifications = {};
  try {
    qualifications = await new Client().getQualifications(searchParams);
  } catch (error) {
    if (error instanceof RequestError) {
      return <Alert type="failure">{error.message}</Alert>;
    }
  }

  return (
    <Card>
      <Table>
        <TableHead className="text-center">
          <TableHeadCell colSpan="2">Qualifications</TableHeadCell>
        </TableHead>
        <TableBody>
          {qualifications?.data && !!qualifications.data.length ? (
            qualifications.data.map((qualification) => {
              return (
                <TableRow key={qualification.id}>
                  <TableCell className="hidden w-1/6 !py-4 sm:table-cell">
                    {qualification.image?.image_url ? (
                      <div className="relative mx-auto flex size-20 items-center justify-center">
                        <Image
                          src={qualification.image.image_url}
                          alt={qualification.name}
                          width={80}
                          height={80}
                          priority={true}
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
                      {qualification.image?.image_url && (
                        <div className="relative mb-2 flex size-8 sm:hidden">
                          <Image
                            src={qualification.image.image_url}
                            alt={qualification.name}
                            width={32}
                            height={32}
                            priority={true}
                            className="h-full w-full object-contain"
                          />
                        </div>
                      )}
                      <div className="text-sm font-semibold text-gray-950 dark:text-white">
                        {qualification.name}
                      </div>
                      {qualification.description && (
                        <div
                          className="mt-2 text-xs text-gray-700 dark:text-gray-400"
                          dangerouslySetInnerHTML={{ __html: qualification.description }}
                        ></div>
                      )}
                    </>
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <div className="flex items-center justify-center p-8 text-xs text-gray-700 dark:text-gray-400">
              There are no qualifications to view.
            </div>
          )}
        </TableBody>
      </Table>
      {qualifications?.meta && <Pagination meta={qualifications.meta} />}
    </Card>
  );
}
