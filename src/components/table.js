import { Table as FlowbiteTable } from 'flowbite-react';

export function Table(props) {
  return (
    <FlowbiteTable
      {...(({ children, ...o }) => o)(props)}
      theme={{
        root: {
          base: 'w-full text-left text-sm text-gray-950 dark:text-gray-400',
          shadow: 'absolute bg-white dark:bg-gray-900 w-full h-full top-0 left-0 rounded-lg -z-10'
        },
        body: {
          cell: {
            base: 'px-4 sm:px-6 py-4 group-first/body:group-first/row:first:rounded-tl-lg group-first/body:group-first/row:last:rounded-tr-lg group-last/body:group-last/row:first:rounded-bl-lg group-last/body:group-last/row:last:rounded-br-lg'
          }
        },
        head: {
          base: 'group/head text-xs uppercase text-gray-950 dark:text-white',
          cell: {
            base: 'bg-gray-50 px-6 py-3 group-first/head:first:rounded-tl-lg group-first/head:last:rounded-tr-lg dark:bg-[#09090B]'
          }
        }
      }}
    >
      {props.children}
    </FlowbiteTable>
  );
}
