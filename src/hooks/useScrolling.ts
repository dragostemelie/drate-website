import { useEffect, useState } from 'react';

type Direction = 'START' | 'UP' | 'DOWN';

export const useScrolling = (deps?: React.DependencyList) => {
  const [direction, setDirection] = useState<Direction>('START');

  //SCROLL SETUP
  let lastScroll = 0;
  const scrollEvent = () => {
    const currentScroll = window.scrollY;
    if (currentScroll <= 50) {
      setDirection('START');
      return;
    }
    if (currentScroll > lastScroll + 5) {
      setDirection('DOWN');
    } else if (currentScroll < lastScroll - 5) {
      setDirection('UP');
    }
    lastScroll = currentScroll;
  };

  //SCROLL EVENT
  useEffect(() => {
    setDirection('START');
    window.addEventListener('scroll', scrollEvent);
    return () => {
      window.removeEventListener('scroll', scrollEvent);
    };
  }, [...(deps || [])]);

  return direction;
};
