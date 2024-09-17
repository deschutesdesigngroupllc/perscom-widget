import { Label as FlowbiteLabel } from 'flowbite-react';

export function Label(props) {
  return (
    <FlowbiteLabel
      theme={{
        root: {
          colors: {
            default: 'text-gray-700 dark:text-gray-400'
          }
        }
      }}
      {...props}
    />
  );
}
