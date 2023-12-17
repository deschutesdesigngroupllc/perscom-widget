import NextLink from 'next/link';
import cx from 'classnames';

export function Link(props) {
  return (
    <NextLink
      className={cx(
        props.className,
        'hover:text-gray-600 active:text-blue-600 dark:hover:text-gray-500 dark:active:text-blue-600'
      )}
      href={props.href}
    >
      {props.children}
    </NextLink>
  );
}
