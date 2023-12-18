import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Users'
};

export default function Page() {
  return redirect('/roster');
}
