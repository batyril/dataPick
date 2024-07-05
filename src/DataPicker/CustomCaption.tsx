import { CaptionProps, useNavigation } from 'react-day-picker';
import styles from './DataPicker.module.scss';
import clsx from 'clsx';
import { Arrow } from './icon/Arrow.tsx';
import { MONTHS, YEARS } from './helper.ts';
import { ICaptionProps } from './types.ts';

export function CustomCaption({
  setIsMonthDropdownOpen,
  setIsYearDropdownOpen,
  isMonthDropdownOpen,
  isYearDropdownOpen,
  selectedMonth,
  setSelectedMonth,
  selectedYear,
  setSelectedYear,
}: CaptionProps & ICaptionProps) {
  const { goToMonth } = useNavigation();

  const handleMonthSelect = (month: number) => {
    setSelectedMonth(month);
    setIsMonthDropdownOpen(false);
    goToMonth(new Date(selectedYear, month, 1));
  };

  const handleYearSelect = (year: number) => {
    setSelectedYear(year);
    setIsYearDropdownOpen(false);
    goToMonth(new Date(year, selectedMonth, 1));
  };

  const toggleYearDropdown = () => {
    setIsYearDropdownOpen(!isYearDropdownOpen);
    if (isMonthDropdownOpen) {
      setIsMonthDropdownOpen(false);
    }
  };

  const toggleMonthDropdown = () => {
    setIsMonthDropdownOpen(!isMonthDropdownOpen);
    if (isYearDropdownOpen) {
      setIsYearDropdownOpen(false);
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <div className={styles.top}>
        <button
          className={clsx(
            styles.top_button,
            isMonthDropdownOpen && styles.top_button_selected,
          )}
          onClick={toggleMonthDropdown}
        >
          {MONTHS[selectedMonth]}
          <Arrow
            className={clsx(styles.arrow, {
              [styles.arrow__active]: isMonthDropdownOpen,
            })}
          />
        </button>
        <button
          className={clsx(
            styles.top_button,
            isYearDropdownOpen && styles.top_button_selected,
          )}
          onClick={toggleYearDropdown}
        >
          <Arrow
            className={clsx(styles.arrow, {
              [styles.arrow__active]: isYearDropdownOpen,
            })}
          />
          {selectedYear}
        </button>
      </div>

      {isMonthDropdownOpen && (
        <ul
          className={clsx(styles.dropdown_custom, {
            [styles.dropdown_custom_visible]: isMonthDropdownOpen,
          })}
        >
          {MONTHS.map((month, index) => (
            <li
              key={index}
              className={index === selectedMonth ? styles.selected : ''}
              onClick={() => handleMonthSelect(index)}
            >
              {month}
            </li>
          ))}
        </ul>
      )}

      {isYearDropdownOpen && (
        <ul className={styles.dropdown_custom}>
          {YEARS.map((year) => (
            <li
              key={year}
              className={year === selectedYear ? styles.selected : ''}
              onClick={() => handleYearSelect(year)}
            >
              {year}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
