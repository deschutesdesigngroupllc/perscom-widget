import cx from 'classnames';
import { Button as FlowbiteButton } from 'flowbite-react';

export function Button(props) {
  return (
    <FlowbiteButton
      className={cx(props.className, 'text-xs')}
      {...(({ children, ...o }) => o)(props)}
    >
      {props.children}
    </FlowbiteButton>
  );
}
