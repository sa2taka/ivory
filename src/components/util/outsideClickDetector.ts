import React, { useEffect } from 'react';

export function useOutsideClickDetector(
  ref: React.RefObject<Node>,
  handler: (event: MouseEvent) => void
) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler(event);
      }
    }

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [ref]);
}
