import { Tabs as FlowbiteTabs } from 'flowbite-react';

export function Tabs(props) {
  return (
    <FlowbiteTabs
      {...props}
      theme={{
        base: 'flex flex-col gap-0',
        tablist: {
          tabitem: {
            base: 'flex items-center justify-center p-4 first:rounded-tl-md rounded-t-none text-sm font-medium first:ml-0 disabled:cursor-not-allowed disabled:text-gray-400 disabled:dark:text-gray-500 focus:outline-none',
            styles: {
              default: {
                base: 'first:rounded-tl-md rounded-t-none'
              }
            }
          }
        },
        tabpanel: 'py-0'
      }}
    >
      {props.children}
    </FlowbiteTabs>
  );
}
