import Image from 'next/image';
import { Card } from '../../../../components/card';

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
