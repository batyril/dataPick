import {
  eachMonthOfInterval,
  eachYearOfInterval,
  endOfYear,
  format,
  startOfYear,
} from 'date-fns';
import { ru } from 'date-fns/locale';

export const MONTHS = eachMonthOfInterval({
  start: startOfYear(new Date()),
  end: endOfYear(new Date()),
}).map((month) => format(month, 'LLLL', { locale: ru }));

export function getYearsFromCurrentTo(
  minYear = 1920,
  maxYear = new Date().getFullYear(),
) {
  const years = eachYearOfInterval({
    start: startOfYear(new Date(minYear, 0, 1)),
    end: endOfYear(new Date(maxYear, 11, 31)),
  });

  return years.map((date) => date.getFullYear()).reverse();
}

export const formatDateString = (formatDate: string): string => {
  if (formatDate.length > 8) {
    formatDate = formatDate.slice(0, 8);
  }

  if (formatDate.length > 2) {
    formatDate = formatDate.slice(0, 2) + '.' + formatDate.slice(2);
  }
  if (formatDate.length > 5) {
    formatDate = formatDate.slice(0, 5) + '.' + formatDate.slice(5);
  }

  return formatDate;
};

export const isValidDatePart = (
  value: string,
  part: 'day' | 'month',
): boolean => {
  const number = parseInt(value, 10);
  if (part === 'day') {
    return number >= 1 && number <= 31;
  }
  if (part === 'month') {
    return number >= 1 && number <= 12;
  }
  return false;
};
