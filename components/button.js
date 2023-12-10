'use client';

import Link from 'next/link';
import { Button as FlowbiteButton } from 'flowbite-react';

export function Button(props) {
  return (
    <Link href={props.href}>
      <FlowbiteButton {...props}>{props.children}</FlowbiteButton>
    </Link>
  );
}
