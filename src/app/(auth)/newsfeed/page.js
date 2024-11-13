import { Alert } from '@/components/alert';
import { Card } from '@/components/card';
import { Pagination } from '@/components/pagination';
import { Table } from '@/components/table';
import Auth from '@/lib/auth';
import Client from '@/lib/client';
import { RequestError } from '@/lib/request-error';
import { TableBody, TableCell, TableHead, TableHeadCell, TableRow } from 'flowbite-react';
import { Item } from './_components/item';

export const dynamic = 'force-dynamic';
export const metadata = {
  title: 'Newsfeed'
};

export default async function Page({ searchParams }) {
  const auth = new Auth();
  let newsfeed = {};
  try {
    newsfeed = await new Client().getNewsfeed(searchParams);
  } catch (error) {
    if (error instanceof RequestError) {
      return <Alert type="failure">{error.message}</Alert>;
    }
  }

  const currentUserId = await auth.getAuthIdentifier();

  return (
    <Card>
      <Table striped={false}>
        <TableHead className="text-center">
          <TableHeadCell>Newsfeed</TableHeadCell>
        </TableHead>
        <TableBody className="divide-y divide-gray-100 dark:divide-gray-900">
          {newsfeed?.data && !!newsfeed.data.length ? (
            newsfeed.data.map((item) => {
              return (
                <TableRow key={item.id}>
                  <TableCell>
                    <Item item={item} currentUser={currentUserId} />
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <div className="flex items-center justify-center p-8 text-sm">
              There are no newsfeed items to view.
            </div>
          )}
        </TableBody>
      </Table>
      {newsfeed?.meta && <Pagination meta={newsfeed.meta} />}
    </Card>
  );
}
