import Image from 'next/image';
import { AdditionalFields } from './additional-fields';
import { Demographics } from './demographics';
import { Information } from './information';
import { Records } from './records';
import { SecondaryAssignments } from './secondary-assignments';

export function Profile({ user }) {
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
