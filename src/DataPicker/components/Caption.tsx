import { CaptionProps, useNavigation } from 'react-day-picker';
import styles from '../DataPicker.module.scss';
import clsx from 'clsx';
import { ICaptionProps } from '../types.ts';
import { getYearsFromCurrentTo, MONTHS } from '../helper.ts';
import { CaptionButton } from './CaptionButton.tsx';
import { CaptionList } from './CaptionList.tsx';

export function Caption({
  setIsMonthDropdownOpen,
  setIsYearDropdownOpen,
  isMonthDropdownOpen,
  isYearDropdownOpen,
  selectedMonth,
  setSelectedMonth,
  selectedYear,
  setSelectedYear,
  minYear,
  maxYear,
}: CaptionProps & ICaptionProps) {
  const { goToMonth } = useNavigation();

  const handleMonthSelect = (month: number) => {
    setSelectedMonth(month);
    setIsMonthDropdownOpen(false);
    goToMonth(new Date(selectedYear, month));
  };

  const handleYearSelect = (year: number) => {
    setSelectedYear(year);
    setIsYearDropdownOpen(false);
    goToMonth(new Date(year, selectedMonth));
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
    <div className={styles.caption}>
      <div className={styles.caption_top}>
        <CaptionButton
          toggleDropdown={toggleMonthDropdown}
          isDropdownOpen={isMonthDropdownOpen}
          selectedVariant={MONTHS[selectedMonth]}
        />
        <CaptionButton
          toggleDropdown={toggleYearDropdown}
          isDropdownOpen={isYearDropdownOpen}
          selectedVariant={selectedYear}
        />
      </div>

      <CaptionList isDropdownOpen={isYearDropdownOpen}>
        {getYearsFromCurrentTo(minYear, maxYear).map((year) => (
          <li
            key={year}
            className={clsx({ [styles.selected]: year === selectedYear })}
            onClick={() => handleYearSelect(year)}
          >
            {year}
          </li>
        ))}
      </CaptionList>

      <CaptionList isDropdownOpen={isMonthDropdownOpen}>
        {MONTHS.map((month, index) => (
          <li
            key={index}
            className={clsx({ [styles.selected]: index === selectedMonth })}
            onClick={() => handleMonthSelect(index)}
          >
            {month}
          </li>
        ))}
      </CaptionList>
    </div>
  );
}
