import { Alert } from '../../../../components/alert';
import Client from '../../../../lib/client';
import { RequestError } from '../../../../lib/request-error';
import { Profile } from '../_components/profile';

export const dynamic = 'force-dynamic';
export const metadata = {
  title: 'User'
};

export default async function Page({ params }) {
  let user = {};
  try {
    user = await new Client().getUser(params.id, {
      include: Array(
        'assignment_records',
        'assignment_records.position',
        'assignment_records.specialty',
        'assignment_records.unit',
        'assignment_records.status',
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
        'secondary_assignment_records',
        'secondary_assignment_records.position',
        'secondary_assignment_records.specialty',
        'secondary_assignment_records.unit',
        'secondary_assignment_records.status',
        'service_records',
        'specialty',
        'status',
        'unit'
      ).join()
    });
  } catch (error) {
    if (error instanceof RequestError) {
      return <Alert type="failure">{error.message}</Alert>;
    }
  }

  return <Profile user={user.data} />;
}
