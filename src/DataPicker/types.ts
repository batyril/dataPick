export interface ICaptionProps {
  setIsMonthDropdownOpen: (open: boolean) => void;
  setIsYearDropdownOpen: (open: boolean) => void;
  isMonthDropdownOpen: boolean;
  isYearDropdownOpen: boolean;
  selectedMonth: number;
  setSelectedMonth: (month: number) => void;
  selectedYear: number;
  setSelectedYear: (year: number) => void;
}
