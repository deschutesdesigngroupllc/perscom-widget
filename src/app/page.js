import { headers } from 'next/headers';
import { Card } from '../components/card';
import { Link } from '../components/link';
import Login from '../components/login';
import { Logo } from '../components/logo';
import Logout from '../components/logout';

export default function Page() {
  const hasApiKey = headers().has('x-perscom-apikey');

  return (
    <div className="flex flex-col items-center justify-center bg-gray-50 px-4 py-20 dark:bg-[#09090B] sm:px-20">
      <Logo className="h-12 sm:h-16 sm:h-28" />
      <Card className="mt-10 w-full p-4 sm:max-w-3xl sm:p-6">
        <div className="flex flex-col space-y-6">
          <div className="col-span-full text-center">
            <div className="text-xl font-bold tracking-tight text-gray-950 dark:text-white sm:text-2xl">
              The Official PERSCOM Widget
            </div>
            <div className="mt-1 text-sm dark:text-gray-400">
              Use the links below to navigate to the different widgets.
            </div>
          </div>
          {!hasApiKey && <Login />}
          <div className="grid grid-cols-2 gap-4 border-y py-4 dark:border-gray-600 sm:grid-cols-3">
            <Link
              href={'/roster'}
              className="inline-flexclassNames-center group w-full justify-center rounded-full bg-gray-100 px-4 py-2 text-center text-sm font-semibold hover:bg-gray-50 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:bg-gray-200 active:text-gray-600"
            >
              Roster
            </Link>
            <Link
              href={'/awards'}
              className="inline-flexclassNames-center group w-full justify-center rounded-full bg-gray-100 px-4 py-2 text-center text-sm font-semibold hover:bg-gray-50 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:bg-gray-200 active:text-gray-600"
            >
              Awards
            </Link>
            <Link
              href={'/forms'}
              className="inline-flexclassNames-center group w-full justify-center rounded-full bg-gray-100 px-4 py-2 text-center text-sm font-semibold hover:bg-gray-50 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:bg-gray-200 active:text-gray-600"
            >
              Forms
            </Link>
            <Link
              href={'/newsfeed'}
              className="inline-flexclassNames-center group w-full justify-center rounded-full bg-gray-100 px-4 py-2 text-center text-sm font-semibold hover:bg-gray-50 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:bg-gray-200 active:text-gray-600"
            >
              Newsfeed
            </Link>
            <Link
              href={'/qualifications'}
              className="inline-flexclassNames-center group w-full justify-center rounded-full bg-gray-100 px-4 py-2 text-center text-sm font-semibold hover:bg-gray-50 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:bg-gray-200 active:text-gray-600"
            >
              Qualifications
            </Link>
            <Link
              href={'/ranks'}
              className="inline-flexclassNames-center group w-full justify-center rounded-full bg-gray-100 px-4 py-2 text-center text-sm font-semibold hover:bg-gray-50 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:bg-gray-200 active:text-gray-600"
            >
              Ranks
            </Link>
          </div>
          <div className="text-center text-sm dark:text-gray-400">
            For more information on how to display these widgets on your own website, please visit
            our documentation at{' '}
            <a href="https://docs.perscom.io" target="_blank">
              https://docs.perscom.io
            </a>
          </div>
          {!hasApiKey && <Logout />}
        </div>
      </Card>
    </div>
  );
}
