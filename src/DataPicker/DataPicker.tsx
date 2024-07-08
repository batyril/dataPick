import 'react-day-picker/dist/style.css';
import { ChangeEvent, useId, useRef, useState } from 'react';
import styles from './DataPicker.module.scss';
import { format, isValid, parse } from 'date-fns';
import { CalendarIcon } from './icon/Calendar.tsx';
import clsx from 'clsx';
import { useClickOutside } from './hooks.ts';
import { PatternFormat } from 'react-number-format';
import { formatDateString, isValidDatePart } from './helper.ts';
import { CalendarPicker } from './components/Calendar.tsx';
import { IDataPickerProps } from './types.ts';

export default function DataPicker({
  label = 'Дата рождения',
  minYear = 1950,
  maxYear = new Date().getFullYear(),
}: IDataPickerProps) {
  const inputId = useId();
  const [inputValue, setInputValue] = useState('');
  const [errorList, setErrorList] = useState('');

  const calendarRef = useRef<HTMLDivElement>(null);

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  const handleDayPickerSelect = (date: Date | undefined) => {
    if (!date) {
      setInputValue('');
      setSelectedDate(undefined);
    } else {
      setSelectedDate(date);
      setSelectedMonth(date.getMonth());
      setSelectedYear(date.getFullYear());
      setInputValue(format(date, 'dd.MM.yyyy'));
    }
    setIsCalendarOpen(false);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setInputValue(value);

    const formatDate = formatDateString(e.target.value);

    const [day, month, year] = formatDate.split('.');

    if (day && !isValidDatePart(day, 'day') && day?.length === 2) {
      setErrorList('Некорректный день');
      return;
    }

    if (month && !isValidDatePart(month, 'month') && month?.length === 2) {
      setErrorList('Некорректный месяц');
      return;
    }

    if (year && year?.length === 4) {
      const yearNumber = parseInt(year, 10);
      if (yearNumber < minYear || yearNumber > maxYear) {
        setErrorList('Некорректный год');
        return;
      }
    }

    setErrorList('');
    const parsedDate = parse(formatDate, 'dd.MM.yyyy', new Date());

    if (isValid(parsedDate)) {
      setSelectedDate(parsedDate);

      setSelectedMonth(parsedDate.getMonth());
      setSelectedYear(parsedDate.getFullYear());
    } else if (value.length >= 8) {
      setErrorList('Некорректная дата');
      setSelectedDate(undefined);
    }
  };

  useClickOutside(calendarRef, () => setIsCalendarOpen(false));

  return (
    <div className={clsx(styles.fieldContainer)} ref={calendarRef}>
      <div className={clsx(styles.field, { [styles.invalid]: !!errorList })}>
        <label
          htmlFor={inputId}
          className={clsx(styles.label, { [styles.hasValue]: inputValue })}
        >
          {label}
        </label>
        <PatternFormat
          format='##.##.####'
          mask='_'
          aria-invalid={!!errorList}
          className={styles.input}
          id={inputId}
          value={inputValue}
          onValueChange={({ value }) =>
            handleInputChange({
              target: { value },
            } as ChangeEvent<HTMLInputElement>)
          }
        />
        <CalendarIcon setIsCalendarOpen={setIsCalendarOpen} />
      </div>
      {errorList && <div className={styles.error}>{errorList}</div>}
      <CalendarPicker
        isCalendarOpen={isCalendarOpen}
        selectedDate={selectedDate}
        handleDayPickerSelect={handleDayPickerSelect}
        selectedMonth={selectedMonth}
        selectedYear={selectedYear}
        setSelectedMonth={setSelectedMonth}
        setSelectedYear={setSelectedYear}
        maxYear={maxYear}
        minYear={minYear}
      />
    </div>
  );
}
