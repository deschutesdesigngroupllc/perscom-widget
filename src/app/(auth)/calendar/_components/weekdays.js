'use client';

export function Weekdays({ now }) {
  const weekDays = [];
  for (let i = 0; i < 7; i++) {
    weekDays.push(now.weekday(i));
  }

  return (
    <div className="grid grid-cols-7 gap-px border-b border-gray-300 bg-gray-200 text-center text-xs font-semibold text-gray-950 dark:border-gray-700 dark:bg-gray-700 dark:text-white lg:flex-none">
      {weekDays &&
        !!weekDays.length &&
        weekDays.map((weekDay) => {
          return (
            <div key={weekDay.format('d')} className="bg-white py-2 dark:bg-gray-800">
              <div className="hidden lg:block">{weekDay.format('dddd')}</div>
              <div className="block lg:hidden">{weekDay.format('ddd')}</div>
            </div>
          );
        })}
    </div>
  );
}
