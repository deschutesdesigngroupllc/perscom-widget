import { Logo } from './logo';

export function Footer() {
  const version = process.env.NEXT_PUBLIC_WIDGET_VERSION;

  return (
    <footer className="flex flex-row justify-center">
      <div className="mt-2 flex items-center space-x-1">
        <Logo className="h-6 w-16" />
        <div className="text-xs dark:text-gray-500">
          Widget Provided By{' '}
          <a href="https://perscom.io" target="_blank" rel="noreferrer" className="underline">
            PERSCOM.io
          </a>
          .{' '}
          <span className="hidden sm:inline">
            Copyright {new Date().getFullYear()} Deschutes Design Group LLC.
          </span>{' '}
          {version && <span className="hidden md:inline">Version {version}.</span>}
        </div>
      </div>
    </footer>
  );
}
