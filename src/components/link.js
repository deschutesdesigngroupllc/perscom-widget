'use client';

import cx from 'classnames';
import NextLink from 'next/link';
import { useSearchParams } from 'next/navigation';

export function Link(props) {
  const params = useSearchParams();

  return (
    <NextLink
      href={{ pathname: props.href, search: params?.toString() }}
      className={cx(props.className, 'text-gray-950 hover:text-gray-700 active:text-blue-600')}
    >
      {props.children}
    </NextLink>
  );
}
