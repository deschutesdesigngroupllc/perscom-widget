export function Submit(props) {
  return (
    <button
      type="submit"
      className="group relative flex items-center justify-center rounded-lg border border-gray-200 bg-blue-600 p-0.5 text-center font-medium text-white hover:bg-blue-700 focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 dark:border-gray-600 dark:bg-transparent dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
      {...props}
    >
      <span className="flex items-center rounded-md px-4 py-2 text-sm transition-all duration-200">
        {props.children}
      </span>
    </button>
  );
}
