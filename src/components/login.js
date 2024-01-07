'use client';

import useSession from '../hooks/use-session';

export default function Login() {
  const { login } = useSession();

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const perscomId = formData.get('perscomId');
    const apiKey = formData.get('apiKey');

    if (perscomId && apiKey) {
      login(
        { perscomId, apiKey },
        {
          optimisticData: {
            isLoggedIn: true
          }
        }
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} method="POST" className="grid grid-cols-1 gap-6 sm:grid-cols-6">
      <div className="col-span-full sm:col-span-2">
        <label className="undefined block text-sm font-medium">PERSCOM ID</label>
        <div>
          <input
            type="number"
            name="perscomId"
            id="perscomId"
            className="block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm"
          />
        </div>
      </div>
      <div className="col-span-full sm:col-span-4">
        <label className="undefined block text-sm font-medium">API Key</label>
        <div>
          <input
            type="password"
            name="apiKey"
            id="apiKey"
            autoComplete="new-password"
            className="block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm"
          />
        </div>
      </div>
      <button
        className="group col-span-full inline-flex w-full items-center justify-center rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500 hover:text-gray-100 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 active:bg-blue-800 active:text-blue-100"
        type="submit"
      >
        Log in
      </button>
    </form>
  );
}
