import Image from 'next/image';
import { Card } from '../../../../components/card';
import { Status } from '../../../../components/status';

export function Information({ user }) {
  const { name, rank, position, profile_photo_url, status } = user;
  const { name: rank_name, abbreviation: rank_abbreviation, image: rank_image } = rank ?? {};
  const { image_url: rank_image_url } = rank_image ?? {};
  const { name: position_name } = position ?? {};
  const { name: status_name, color: status_color } = status ?? {};

  const profile_photo = profile_photo_url ?? rank_image_url ?? null;

  return (
    <Card className="w-full justify-start p-6 md:w-1/3">
      <div className="flex items-center justify-between">
        <h5 className="text-xl font-bold text-gray-950 dark:text-white">Personnel Profile</h5>
        {status && <Status text={status_name} color={status_color} />}
      </div>
      <div className="flex flex-grow flex-col items-center justify-center space-y-4 py-4">
        {profile_photo && (
          <div className="relative h-28 w-28">
            <Image src={profile_photo} alt={name} fill objectFit="contain" />
          </div>
        )}
        <div className="flex flex-col items-center justify-center text-center">
          <div className="font-bold text-gray-950 dark:text-white">
            {rank_abbreviation} {name} {'  '}
          </div>
          {rank_name && (
            <div className="text-xs font-bold text-gray-700 dark:text-gray-400">{rank_name}</div>
          )}{' '}
          {position_name && (
            <div className="text-xs font-light text-gray-700 dark:text-gray-400">
              {position_name}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
