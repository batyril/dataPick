import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { ChangeEvent, useId, useRef, useState } from 'react';
import { ru } from 'date-fns/locale';
import styles from './DataPicker.module.scss';
import { format, isValid, parse } from 'date-fns';
import { Calendar } from './icon/Calendar.tsx';
import { getStyles, MODIFIERS_STYLES } from './styles.ts';
import { CustomCaption } from './CustomCaption.tsx';
import clsx from 'clsx';
import { useClickOutside } from './hooks.ts';
import { PatternFormat } from 'react-number-format';
import { formatInputValue } from './helper.ts';

interface IDataPickerProps {
  label?: string;
  type?: string;
}

export default function DataPicker({
  label = 'дата рождения',
}: IDataPickerProps) {
  const inputId = useId();
  const [inputValue, setInputValue] = useState('');
  const [errorList, setErrorList] = useState('');

  const calendarRef = useRef<HTMLDivElement>(null);
  //dropdown
  const [showMonthDropdown, setShowMonthDropdown] = useState(false);
  const [showYearDropdown, setShowYearDropdown] = useState(false);

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
    const dateNew = formatInputValue(e.target.value);

    const parsedDate = parse(dateNew, 'dd.MM.yyyy', new Date());
    if (isValid(parsedDate)) {
      setSelectedDate(parsedDate);
      setSelectedMonth(parsedDate.getMonth());
      setSelectedYear(parsedDate.getFullYear());
    } else {
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
        <Calendar setIsCalendarOpen={setIsCalendarOpen} />
      </div>

      {isCalendarOpen && (
        <div className={styles.calendarWrapper}>
          <DayPicker
            captionLayout='dropdown'
            fromMonth={new Date(1995, 0)}
            toMonth={new Date(2025, 11)}
            disableNavigation={false}
            mode='single'
            locale={ru}
            selected={selectedDate}
            onSelect={handleDayPickerSelect}
            month={new Date(selectedYear, selectedMonth)}
            onMonthChange={(date) => {
              setSelectedMonth(date.getMonth());
              setSelectedYear(date.getFullYear());
            }}
            pagedNavigation
            numberOfMonths={1}
            showOutsideDays
            modifiersStyles={MODIFIERS_STYLES}
            styles={getStyles(showMonthDropdown, showYearDropdown)}
            components={{
              Caption: (props) => (
                <CustomCaption
                  {...props}
                  setIsMonthDropdownOpen={setShowMonthDropdown}
                  setIsYearDropdownOpen={setShowYearDropdown}
                  isMonthDropdownOpen={showMonthDropdown}
                  isYearDropdownOpen={showYearDropdown}
                  selectedMonth={selectedMonth}
                  setSelectedMonth={setSelectedMonth}
                  selectedYear={selectedYear}
                  setSelectedYear={setSelectedYear}
                />
              ),
            }}
          />
        </div>
      )}
    </div>
  );
}
