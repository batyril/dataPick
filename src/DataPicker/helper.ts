import { eachMonthOfInterval, endOfYear, format, startOfYear } from 'date-fns';
import { ru } from 'date-fns/locale';

export const MONTHS = eachMonthOfInterval({
  start: startOfYear(new Date()),
  end: endOfYear(new Date()),
}).map((month) => format(month, 'LLLL', { locale: ru }));

export function getYearsFromCurrentTo(endYear = 2020) {
  const currentYear = new Date().getFullYear();
  const years = [];

  for (let year = currentYear; year >= endYear; year--) {
    years.push(year);
  }

  return years;
}

export const formatInputValue = (value: string) => {
  const onlyNums = value.replace(/\D/g, '');
  if (onlyNums.length <= 2) return onlyNums;
  if (onlyNums.length <= 4)
    return `${onlyNums.slice(0, 2)}.${onlyNums.slice(2, 4)}`;
  return `${onlyNums.slice(0, 2)}.${onlyNums.slice(2, 4)}.${onlyNums.slice(4, 8)}`;
};

export const YEARS = getYearsFromCurrentTo();
