import clsx from 'clsx';
import styles from '../DataPicker.module.scss';
import { ReactNode } from 'react';

export interface CaptionListProps {
  isDropdownOpen: boolean;
  children: ReactNode;
}

export function CaptionList({ isDropdownOpen, children }: CaptionListProps) {
  return (
    isDropdownOpen && (
      <ul
        className={clsx(styles.dropdown_custom, {
          [styles.dropdown_custom_visible]: isDropdownOpen,
        })}
      >
        {children}
      </ul>
    )
  );
}
