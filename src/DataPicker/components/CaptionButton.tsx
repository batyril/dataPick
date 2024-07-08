import clsx from 'clsx';
import styles from '../DataPicker.module.scss';
import { ArrowIcon } from '../icon/Arrow.tsx';
import { CaptionButtonProps } from '../types.ts';

export function CaptionButton({
  toggleDropdown,
  isDropdownOpen,
  selectedVariant,
}: CaptionButtonProps) {
  return (
    <button
      className={clsx(styles.caption_button, {
        [styles.caption_button_selected]: isDropdownOpen,
      })}
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
