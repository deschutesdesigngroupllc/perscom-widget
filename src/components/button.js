import { Button as FlowbiteButton } from 'flowbite-react';

export function Button(props) {
  return <FlowbiteButton {...(({ children, ...o }) => o)(props)}>{props.children}</FlowbiteButton>;
}
