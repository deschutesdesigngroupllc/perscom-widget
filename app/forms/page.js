import ApiClient from '../../api/client';
import Auth from '../../api/auth';
import { TableHead, TableHeadCell, TableBody, TableRow, TableCell } from 'flowbite-react';
import { Pagination } from '../../components/pagination';
import { Button } from '../../components/button';
import { Table } from '../../components/table';
import { Card } from '../../components/card';

export const metadata = {
  title: 'Forms'
};

export default async function Page({ searchParams }) {
  const forms = await new ApiClient(new Auth(searchParams)).getForms();

  return (
    <Card>
      <Table>
        <TableHead className="text-center">
          <TableHeadCell>Forms</TableHeadCell>
        </TableHead>
        <TableBody>
          {forms.data.map((form) => {
            return (
              <TableRow key={form.id}>
                <TableCell className="hidden w-1/6 !py-4 sm:table-cell">
                  <div className="flex flex-col items-start justify-between space-x-0 space-y-4 md:flex-row md:items-center md:space-x-8 md:space-y-0">
                    <div>
                      <div className="mb-2 text-sm font-semibold">{form.name}</div>
                      <div className="text-sm">{form.description}</div>
                    </div>
                    <div className="flex-shrink-0">
                      <Button href={`forms/${form.id}`} color="gray">
                        Open Form
                      </Button>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <Pagination meta={forms.meta} searchParams={searchParams} />
    </Card>
  );
}
