'use client';

import useSession from '../hooks/use-session';

export default function Logout() {
  const { logout } = useSession();

  const handleSubmit = (event) => {
    event.preventDefault();

    logout(null, {
      optimisticData: {
        isLoggedIn: false
      }
    });
  };

  return (
    <a
      onClick={handleSubmit}
      className="group col-span-full inline-flex w-full items-center justify-center rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500 hover:text-gray-100 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 active:bg-blue-800 active:text-blue-100"
      type="submit"
    >
      Log out
    </a>
  );
}
