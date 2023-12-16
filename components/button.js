import { Button as FlowbiteButton } from 'flowbite-react';

export function Button(props) {
  return <FlowbiteButton {...props}>{props.children}</FlowbiteButton>;
}
