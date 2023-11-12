import { useState, useEffect } from 'react';

const getViewport = () => {
  return {
    width: window.visualViewport ? window.visualViewport.width : window.innerWidth,
    height: window.innerHeight,
    offsetTop: window.visualViewport ? window.visualViewport.offsetTop : 0,
    keyboardHeight: window.visualViewport ? window.innerHeight - window.visualViewport.height : 0,
  };
};

export const useViewport = () => {
  const [pageSize, setPageSize] = useState<ReturnType<typeof getViewport>>(getViewport());

  useEffect(() => {
    const viewportChange = () => {
      setPageSize(getViewport());
    };
    //add listeners
    window.addEventListener('resize', viewportChange);
    window.visualViewport?.addEventListener('resize', viewportChange);
    window.visualViewport?.addEventListener('scroll', viewportChange);

    //remove listeners
    return () => {
      window.removeEventListener('resize', viewportChange);
      window.visualViewport?.removeEventListener('resize', viewportChange);
      window.visualViewport?.removeEventListener('scroll', viewportChange);
    };
  });
  return pageSize;
};
