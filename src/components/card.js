import { Card as FlowbiteCard } from 'flowbite-react';

export function Card(props) {
  return (
    <FlowbiteCard
      {...(({ children, ...o }) => o)(props)}
      theme={{
        root: {
          base: 'flex rounded-lg bg-white shadow dark:border-gray-700 dark:bg-gray-900',
          children: 'flex h-full flex-col justify-center p-0'
        }
      }}
    >
      {props.children}
    </FlowbiteCard>
  );
}
