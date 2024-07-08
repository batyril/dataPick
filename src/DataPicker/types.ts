import { Dispatch, SetStateAction } from 'react';

export interface ICaptionProps {
  setIsMonthDropdownOpen: (open: boolean) => void;
  setIsYearDropdownOpen: (open: boolean) => void;
  isMonthDropdownOpen: boolean;
  isYearDropdownOpen: boolean;
  selectedMonth: number;
  setSelectedMonth: (month: number) => void;
  selectedYear: number;
  setSelectedYear: (year: number) => void;
  minYear: number;
  maxYear: number;
}

export interface ICalendarPickerProps {
  selectedDate: Date | undefined;
  handleDayPickerSelect: (date: Date | undefined) => void;
  selectedMonth: number;
  selectedYear: number;
  setSelectedMonth: (month: number) => void;
  setSelectedYear: (year: number) => void;
  maxYear: number;
  minYear: number;
  isCalendarOpen: boolean;
}

export interface IDataPickerProps {
  label?: string;
  type?: string;
  minYear?: number;
  maxYear?: number;
}

export interface ICalendarProps {
  setIsCalendarOpen: Dispatch<SetStateAction<boolean>>;
}

export interface CaptionButtonProps {
  toggleDropdown: () => void;
  isDropdownOpen: boolean;
  selectedVariant: string | number;
}
