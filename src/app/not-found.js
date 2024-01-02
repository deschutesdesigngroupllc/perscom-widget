import { Card } from '../components/card';

export default function NotFound() {
  return (
    <Card>
      <div className="flex items-center justify-center py-4 text-sm">
        The widget you requested was not found.
      </div>
    </Card>
  );
}
