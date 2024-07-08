import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { useState } from 'react';
import { ru } from 'date-fns/locale';
import styles from '../DataPicker.module.scss';
import { getStyles } from '../styles.ts';
import { Caption } from './Caption.tsx';
import { ICalendarPickerProps } from '../types.ts';

export function CalendarPicker({
  selectedDate,
  isCalendarOpen,
  handleDayPickerSelect,
  selectedMonth,
  selectedYear,
  setSelectedMonth,
  setSelectedYear,
  maxYear,
  minYear,
}: ICalendarPickerProps) {
  const [showMonthDropdown, setShowMonthDropdown] = useState(false);
  const [showYearDropdown, setShowYearDropdown] = useState(false);

  return (
    isCalendarOpen && (
      <div className={styles.calendarWrapper}>
        <DayPicker
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
          styles={getStyles(showMonthDropdown, showYearDropdown)}
          components={{
            Caption: (props) => (
              <Caption
                maxYear={maxYear}
                minYear={minYear}
                setIsMonthDropdownOpen={setShowMonthDropdown}
                setIsYearDropdownOpen={setShowYearDropdown}
                isMonthDropdownOpen={showMonthDropdown}
                isYearDropdownOpen={showYearDropdown}
                selectedMonth={selectedMonth}
                setSelectedMonth={setSelectedMonth}
                selectedYear={selectedYear}
                setSelectedYear={setSelectedYear}
                {...props}
              />
            ),
          }}
        />
      </div>
    )
  );
}
