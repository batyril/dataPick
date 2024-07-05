export const MODIFIERS_STYLES = {
  selected: {
    backgroundColor: '#003791',
    color: 'white',
    borderRadius: '4px',
  },
  day: {
    borderRadius: '0',
  },
  today: {
    color: '#003791',
    textDecoration: 'underline',
  },
};

export const getStyles = (
  showMonthDropdown: boolean,
  showYearDropdown: boolean,
) => {
  return {
    root: {
      transition: 'all 0.1s ease-in-out',
      boxSizing: 'border-box',
      width: '312px',
      height: showMonthDropdown || showYearDropdown ? '380px' : '352px',
      border: '1px solid #E4E4E4',
      borderRadius: '8px',
      padding: '30px 17px',
      fontFamily: 'Roboto',
      boxShadow: '0px 1px 22px -5px rgba(38, 40, 41, 0.16)',
    },
    table: {
      display: showMonthDropdown || showYearDropdown ? 'none' : 'block',
    },
    months: {
      display: 'block',
    },
    day: {
      fontSize: '14px',
      border: '1px solid transparent',
    },
    head_row: {
      fontSize: '14px',
    },
  };
};
