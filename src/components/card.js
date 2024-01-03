import { Card as FlowbiteCard } from 'flowbite-react';

export function Card(props) {
  return (
    <FlowbiteCard
      {...props}
      theme={{
        root: {
          base: 'flex rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800',
          children: 'flex h-full flex-col justify-center gap-4 p-0'
        }
      }}
    >
      {props.children}
    </FlowbiteCard>
  );
}
