import { Button } from './button';

export function Submit(props) {
  return (
    <Button
      type="submit"
      className={props.className}
      {...(({ className, children, ...o }) => o)(props)}
    >
      {props.children}
    </Button>
  );
}
