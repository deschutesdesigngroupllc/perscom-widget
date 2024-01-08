import { Card } from '../components/card';
import { Link } from '../components/link';
import Login from '../components/login';
import { Logo } from '../components/logo';
import Logout from '../components/logout';

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 px-4 py-20 dark:bg-gray-900 sm:px-20">
      <Logo className="h-16 sm:h-28" />
      <Card className="mt-10 w-full p-6 sm:max-w-3xl">
        <div className="flex flex-col space-y-6">
          <div className="col-span-full text-center">
            <div className="trackinxg-tighter text-lg font-bold">
              Welcome to the Official PERSCOM Widget.
            </div>
            <div className="text-sm">Use the links below to navigate to the different widgets.</div>
          </div>
          <Login />
          <div className="grid grid-cols-2 gap-4 border-y py-4 dark:border-gray-600 sm:grid-cols-4">
            <Link
              href={'/roster'}
              className="inline-flexclassNames-center group w-full justify-center rounded-full bg-gray-100 px-4 py-2 text-center text-sm font-semibold text-gray-800 hover:bg-gray-50 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:bg-gray-200 active:text-gray-600"
            >
              Roster
            </Link>
            <Link
              href={'/awards'}
              className="inline-flexclassNames-center group w-full justify-center rounded-full bg-gray-100 px-4 py-2 text-center text-sm font-semibold text-gray-800 hover:bg-gray-50 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:bg-gray-200 active:text-gray-600"
            >
              Awards
            </Link>
            <Link
              href={'/calendar'}
              className="inline-flexclassNames-center group w-full justify-center rounded-full bg-gray-100 px-4 py-2 text-center text-sm font-semibold text-gray-800 hover:bg-gray-50 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:bg-gray-200 active:text-gray-600"
            >
              Calendar
            </Link>
            <Link
              href={'/forms'}
              className="inline-flexclassNames-center group w-full justify-center rounded-full bg-gray-100 px-4 py-2 text-center text-sm font-semibold text-gray-800 hover:bg-gray-50 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:bg-gray-200 active:text-gray-600"
            >
              Forms
            </Link>
            <Link
              href={'/newsfeed'}
              className="inline-flexclassNames-center group w-full justify-center rounded-full bg-gray-100 px-4 py-2 text-center text-sm font-semibold text-gray-800 hover:bg-gray-50 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:bg-gray-200 active:text-gray-600"
            >
              Newsfeed
            </Link>
            <Link
              href={'/qualifications'}
              className="inline-flexclassNames-center group w-full justify-center rounded-full bg-gray-100 px-4 py-2 text-center text-sm font-semibold text-gray-800 hover:bg-gray-50 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:bg-gray-200 active:text-gray-600"
            >
              Qualifications
            </Link>
            <Link
              href={'/ranks'}
              className="inline-flexclassNames-center group w-full justify-center rounded-full bg-gray-100 px-4 py-2 text-center text-sm font-semibold text-gray-800 hover:bg-gray-50 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:bg-gray-200 active:text-gray-600"
            >
              Ranks
            </Link>
          </div>
          <div>
            For more information on how to display these widgets on your own website, please visit
            our documentation at{' '}
            <a href="https://docs.perscom.io" target="_blank">
              https://docs.perscom.io
            </a>
          </div>
          <Logout />
        </div>
      </Card>
    </div>
  );
}
