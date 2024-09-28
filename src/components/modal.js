import cx from 'classnames';
import {
  Modal as FlowbiteModal,
  ModalBody as FlowbiteModalBody,
  ModalHeader as FlowbiteModalHeader
} from 'flowbite-react';

export function ModalHeader(props) {
  return (
    <FlowbiteModalHeader
      className={cx(props.className, 'text-xs')}
      {...(({ children, ...o }) => o)(props)}
    >
      {props.children}
    </FlowbiteModalHeader>
  );
}

export function ModalBody(props) {
  return (
    <FlowbiteModalBody
      className={cx(props.className, 'text-xs')}
      {...(({ children, ...o }) => o)(props)}
    >
      {props.children}
    </FlowbiteModalBody>
  );
}

export function Modal(props) {
  return (
    <FlowbiteModal
      className={cx(props.className, 'text-xs')}
      {...(({ children, ...o }) => o)(props)}
      theme={{
        content: {
          inner: 'relative flex max-h-[90dvh] flex-col rounded-lg bg-white shadow dark:bg-gray-800'
        },
        header: {
          base: 'flex items-start justify-between rounded-t border-b p-5 dark:border-gray-600 text-xs dark:bg-[#09090B]'
        }
      }}
    >
      {props.children}
    </FlowbiteModal>
  );
}
