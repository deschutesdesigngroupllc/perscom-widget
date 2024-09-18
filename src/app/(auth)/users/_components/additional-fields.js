import get from 'lodash/get';
import { Card } from '../../../../components/card';
import { Value } from '../../../../components/value';

export function AdditionalFields({ user }) {
  const { fields } = user;

  return (
    <>
      {fields && !!fields.length && (
        <Card className="p-4 sm:p-6">
          <h5 className="text-xl font-bold text-gray-950 dark:text-white">
            Additional Information
          </h5>
          <div className="flow-root">
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {fields.map(function (field) {
                return (
                  <li key={field.key} className="py-2">
                    <p className="truncate text-xs font-semibold text-gray-950 dark:text-white">
                      {field.name}
                    </p>
                    <div className="text-xs text-gray-700 dark:text-gray-400">
                      <Value field={field} value={get(user, field.key, '')} />
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </Card>
      )}
    </>
  );
}
