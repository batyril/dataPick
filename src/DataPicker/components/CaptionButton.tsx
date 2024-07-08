import clsx from 'clsx';
import styles from '../DataPicker.module.scss';
import { ArrowIcon } from '../icon/Arrow.tsx';
import { CaptionButtonProps } from '../types.ts';
import { useRef, KeyboardEvent, useEffect } from 'react';

export function CaptionButton({
  toggleDropdown,
  isDropdownOpen,
  selectedVariant,
}: CaptionButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      toggleDropdown();
    }
  };

  useEffect(() => {
    if (isDropdownOpen && buttonRef.current) {
      buttonRef.current.focus();
    }
  }, [isDropdownOpen]);

  return (
    <button
      ref={buttonRef}
      className={clsx(styles.caption_button, {
        [styles.caption_button_selected]: isDropdownOpen,
      })}
      onKeyDown={handleKeyDown}
      onClick={toggleDropdown}
    >
      {selectedVariant}
      <ArrowIcon
        className={clsx(styles.arrow, {
          [styles.arrow__active]: isDropdownOpen,
        })}
      />
    </button>
  );
}
