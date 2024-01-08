import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XCircleIcon
} from '@heroicons/react/20/solid';
import { Alert as FlowbiteAlert } from 'flowbite-react';

export function Alert({ children, type = 'info', error }) {
  const icon = () => {
    switch (type) {
      case 'info':
        return <InformationCircleIcon className="mr-2 h-5 w-5" aria-hidden="true" />;
      case 'success':
        return <CheckCircleIcon className="mr-2 h-5 w-5" aria-hidden="true" />;
      case 'warning':
        return <ExclamationTriangleIcon className="mr-2 h-5 w-5" aria-hidden="true" />;
      case 'failure':
        return <XCircleIcon className="mr-2 h-5 w-5" aria-hidden="true" />;
    }
  };

  return (
    <FlowbiteAlert color={type} icon={icon}>
      <span>
        <p>{children}</p>
      </span>
    </FlowbiteAlert>
  );
}
