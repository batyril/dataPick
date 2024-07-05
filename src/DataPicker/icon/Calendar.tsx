import { Dispatch, SetStateAction } from 'react';

export function Calendar({
  setIsCalendarOpen,
}: {
  setIsCalendarOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const handleClick = () => {
    setIsCalendarOpen((open: boolean) => !open);
  };

  return (
    <svg
      onClick={handleClick}
      width='19'
      height='20'
      viewBox='0 0 19 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M4.55952 0C5.11181 0 5.55952 0.447715 5.55952 1V1.54285H13.75V1C13.75 0.447715 14.1977 0 14.75 0C15.3023 0 15.75 0.447715 15.75 1V1.60368C17.4644 1.92073 18.75 3.43847 18.75 5.24285V16.3C18.75 18.3317 17.1201 20 15.0833 20H4.41667C2.37995 20 0.75 18.3317 0.75 16.3V5.24285C0.75 3.50594 1.94126 2.03463 3.55952 1.64423V1C3.55952 0.447715 4.00724 0 4.55952 0ZM4.53991 3.54285H4.41667C3.50787 3.54285 2.75 4.29222 2.75 5.24285V5.91425H16.75V5.24285C16.75 4.29222 15.9921 3.54285 15.0833 3.54285H4.57914C4.57262 3.54297 4.56608 3.54304 4.55952 3.54304C4.55297 3.54304 4.54643 3.54297 4.53991 3.54285ZM16.75 7.91425H2.75V16.3C2.75 17.2506 3.50787 18 4.41667 18H15.0833C15.9921 18 16.75 17.2506 16.75 16.3V7.91425Z'
        fill='#757575'
      />
    </svg>
  );
}
