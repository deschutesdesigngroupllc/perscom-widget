import Auth from '../../api/auth';
import Client from '../../api/client';
import { Item } from './_components/item';

export const dynamic = 'force-dynamic';
export const metadata = {
  title: 'Newsfeed'
};

export default async function Page({ searchParams }) {
  const auth = new Auth(searchParams);
  const newsfeed = await new Client(auth).getNewsfeed();

  return (
    <div className="flex flex-col space-y-2">
      <div className="flex flex-col space-y-6">
        {newsfeed.data &&
          !!newsfeed.data.length &&
          newsfeed.data.map((item) => {
            return <Item key={item.id} item={item} currentUser={auth.getAuthIdentifier()} />;
          })}
      </div>
    </div>
  );
}
