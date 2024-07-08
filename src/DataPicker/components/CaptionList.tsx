import clsx from 'clsx';
import styles from '../DataPicker.module.scss';
import { ReactNode, KeyboardEvent, useRef, useEffect, useState } from 'react';

export interface CaptionListProps {
  isDropdownOpen: boolean;
  selectedIndex: number;
  children: ReactNode;
}

export function CaptionList({
  isDropdownOpen,
  selectedIndex,
  children,
}: CaptionListProps) {
  const listRef = useRef<HTMLUListElement>(null);
  const [focusIndex, setFocusIndex] = useState(selectedIndex);

  const handleKeyDown = (e: KeyboardEvent<HTMLUListElement>) => {
    const items = listRef.current?.children;
    if (!items) return;

    const isValidFocusIndex = focusIndex >= 0 && focusIndex < items.length;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setFocusIndex((prevIndex) => (prevIndex + 1) % items.length);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setFocusIndex(
          (prevIndex) => (prevIndex - 1 + items.length) % items.length,
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (isValidFocusIndex) {
          (items[focusIndex] as HTMLElement).click();
        }
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (isDropdownOpen) {
      setFocusIndex(selectedIndex);
    } else {
      setFocusIndex(-1);
    }
  }, [isDropdownOpen, selectedIndex]);

  useEffect(() => {
    const items = listRef.current?.children;
    const isValidFocusIndex =
      items && focusIndex >= 0 && focusIndex < items.length;

    if (isValidFocusIndex) {
      (items[focusIndex] as HTMLElement).focus();
    }
  }, [focusIndex]);

  return (
    isDropdownOpen && (
      <ul
        ref={listRef}
        className={clsx(styles.dropdown_custom, {
          [styles.dropdown_custom_visible]: isDropdownOpen,
        })}
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        {children}
      </ul>
    )
  );
}
