import { Spinner } from 'flowbite-react';
import { Card } from '../components/card';

export default function Loading() {
  return (
    <Card>
      <div className="flex items-center justify-center py-8">
        <Spinner color="gray" />
      </div>
    </Card>
  );
}
