import Auth from '../../../api/auth';
import Client from '../../../api/client';
import Image from 'next/image';
import get from 'lodash/get';
import { ChevronLeftIcon } from '@heroicons/react/20/solid';
import { Card } from '../../../components/card';
import { Link } from '../../../components/link';
import { SecondaryAssignments } from './_components/secondaryAssignments';
import { Records } from './_components/records';
import { Value } from '../../../components/value';

export default async function Page({ searchParams, params }) {
  const { id } = params;
  const auth = new Auth(searchParams);
  const userData = await new Client(auth).getUser(id, {
    include: Array(
      'assignment_records',
      'assignment_records.position',
      'assignment_records.specialty',
      'assignment_records.unit',
      'award_records',
      'award_records.award',
      'award_records.award.image',
      'combat_records',
      'fields',
      'position',
      'qualification_records',
      'qualification_records.qualification',
      'qualification_records.qualification.image',
      'rank',
      'rank.image',
      'rank_records',
      'rank_records.rank',
      'rank_records.rank.image',
      'secondary_positions',
      'secondary_specialties',
      'secondary_units',
      'service_records',
      'specialty',
      'status',
      'unit'
    ).join()
  });
  const user = userData.data;

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-row items-center justify-start space-x-1 active:text-blue-600">
        <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
        <Link href={'/roster'} className="text-sm">
          Back to Roster
        </Link>
      </div>
      <Profile user={user} />
    </div>
  );
}

function Profile({ user }) {
  const { name, cover_photo_url } = user;

  return (
    <div className="flex min-h-fit flex-col space-y-4">
      {cover_photo_url && (
        <div className="relative h-24 w-auto items-center justify-center overflow-hidden sm:h-36 md:h-48 lg:h-60 xl:h-80">
          <Image src={cover_photo_url} alt={name} fill objectFit="contain" />
        </div>
      )}
      <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
        <Information user={user} />
        <Demographics user={user} />
      </div>
      <AdditionalFields user={user} />
      <SecondaryAssignments user={user} />
      <Records user={user} />
    </div>
  );
}

function Information({ user }) {
  const { name, rank, position, profile_photo_url, status } = user;
  const { name: rank_name, abbreviation: rank_abbreviation, image: rank_image } = rank ?? {};
  const { image_url: rank_image_url } = rank_image ?? {};
  const { name: position_name } = position ?? {};
  const { name: status_name, color: status_color } = status ?? {};

  const profile_photo = profile_photo_url ?? rank_image_url ?? null;

  return (
    <Card className="w-full justify-start p-6 md:w-1/3">
      <div className="flex items-center justify-between">
        <h5 className="text-xl font-bold">Personnel Profile</h5>
        {status && (
          <span
            className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${status_color}`}
          >
            {status_name}
          </span>
        )}
      </div>
      <div className="flex flex-grow flex-col items-center justify-center space-y-4 py-4">
        {profile_photo && (
          <div className="relative h-28 w-28">
            <Image src={profile_photo} alt={name} fill objectFit="contain" />
          </div>
        )}
        <div className="flex flex-col items-center justify-center text-center">
          <div className="font-bold">
            {rank_abbreviation} {name} {'  '}
          </div>
          {rank_name && <div className="font-medium">{rank_name}</div>}{' '}
          {position_name && <div className="font-light">{position_name}</div>}
        </div>
      </div>
    </Card>
  );
}

function Demographics({ user }) {
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

function AdditionalFields({ user }) {
  const { fields } = user;

  return (
    <>
      {fields && !!fields.length && (
        <Card className="p-6">
          <h5 className="text-xl font-bold">Additional Information</h5>
          <div className="flow-root">
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {fields.map(function (field) {
                return (
                  <li key={field.key} className="py-2">
                    <p className="truncate text-sm font-semibold">{field.name}</p>
                    <div className="text-sm">
                      <Value field={field} value={get(user, field.key, '')} />
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </Card>
      )}
    </>
  );
}
