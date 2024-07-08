export const getStyles = (
  showMonthDropdown: boolean,
  showYearDropdown: boolean,
) => {
  return {
    root: {
      height: showMonthDropdown || showYearDropdown ? '380px' : '352px',
    },
    table: {
      display: showMonthDropdown || showYearDropdown ? 'none' : 'block',
    },
  };
};
