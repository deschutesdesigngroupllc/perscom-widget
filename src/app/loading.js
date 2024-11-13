import { Card } from '@/components/card';
import { Spinner } from '@/components/spinner';

export default function Loading() {
  return (
    <Card>
      <div className="flex items-center justify-center py-8">
        <Spinner color="gray" />
      </div>
    </Card>
  );
}
