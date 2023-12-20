'use client';

import NextLink from 'next/link';
import cx from 'classnames';
import { useSearchParams } from 'next/navigation';

export function Link(props) {
  const params = useSearchParams();

  return (
    <NextLink
      href={{ pathname: props.href, search: params.toString() }}
      className={cx(
        props.className,
        'hover:text-gray-600 active:text-blue-600 dark:hover:text-gray-500 dark:active:text-blue-600'
      )}
    >
      {props.children}
    </NextLink>
  );
}
