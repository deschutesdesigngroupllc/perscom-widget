import { TableBody, TableCell, TableHead, TableHeadCell, TableRow } from 'flowbite-react';
import Auth from '../../api/auth';
import Client from '../../api/client';
import { ButtonLink } from '../../components/buttonlink';
import { Card } from '../../components/card';
import { Pagination } from '../../components/pagination';
import { Table } from '../../components/table';

export const dynamic = 'force-dynamic';
export const metadata = {
  title: 'Forms'
};

export default async function Page({ searchParams }) {
  const forms = await new Client(new Auth(searchParams)).getForms();

  return (
    <Card>
      <Table>
        <TableHead className="text-center">
          <TableHeadCell>Forms</TableHeadCell>
        </TableHead>
        <TableBody>
          {forms.data && !!forms.data.length ? (
            forms.data.map((form) => {
              return (
                <TableRow key={form.id} data-testid={form.name}>
                  <TableCell>
                    <div className="flex flex-col items-start justify-between space-x-0 space-y-4 md:flex-row md:items-center md:space-x-8 md:space-y-0">
                      <div>
                        <div className="mb-2 text-sm font-semibold">{form.name}</div>
                        <div className="text-sm">{form.description}</div>
                      </div>
                      <div className="flex-shrink-0">
                        <ButtonLink href={`forms/${form.id}`} color="gray">
                          Open Form
                        </ButtonLink>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <div className="flex items-center justify-center p-8 text-sm">
              There are no forms to view.
            </div>
          )}
        </TableBody>
      </Table>
      <Pagination meta={forms.meta} />
    </Card>
  );
}
