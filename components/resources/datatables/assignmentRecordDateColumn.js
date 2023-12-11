import { formatDate } from '../../../utils/helpers';

export async function AssignmentRecordDateColumn({ children, row }) {
  return (
    <>
      <p>This is a test</p>
      {formatDate(Date.now())}
    </>
  );
}
