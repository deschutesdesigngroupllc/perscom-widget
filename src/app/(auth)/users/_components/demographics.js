import { Card } from '../../../../components/card';

export function Demographics({ user }) {
  const { name, rank, position, online, unit, specialty } = user;
  const { name: rank_name } = rank ?? {};
  const { name: position_name } = position ?? {};
  const { name: specialty_name } = specialty ?? {};
  const { name: unit_name } = unit ?? {};

  return (
    <Card className="w-full justify-start p-6 md:w-2/3">
      <div className="flex items-center justify-between">
        <h5 className="text-xl font-bold tracking-tight">Demographics</h5>
        {online ? (
          <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-600">
            Online
          </span>
        ) : (
          <span className="inline-flex rounded-full bg-sky-100 px-2 text-xs font-semibold leading-5 text-sky-600">
            Offline
          </span>
        )}
      </div>
      <div className="flow-root">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          <li className="py-2">
            <p className="truncate text-sm font-semibold">Name</p>
            <p className="truncate text-sm">{name}</p>
          </li>
          <li className="py-2">
            <p className="truncate text-sm font-semibold">Rank</p>
            <p className="truncate text-sm">{rank_name}</p>
          </li>
          <li className="py-2">
            <p className="truncate text-sm font-semibold">Primary Position</p>
            <p className="truncate text-sm">{position_name}</p>
          </li>
          <li className="py-2">
            <p className="truncate text-sm font-semibold">Primary Specialty</p>
            <p className="truncate text-sm">{specialty_name}</p>
          </li>
          <li className="py-2">
            <p className="truncate text-sm font-semibold">Primary Unit</p>
            <p className="truncate text-sm">{unit_name}</p>
          </li>
        </ul>
      </div>
    </Card>
  );
}
