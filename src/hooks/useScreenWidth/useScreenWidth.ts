import { useState, useEffect } from 'react';

const useScreenWidth = (): number => {
  const [screenWidth, setScreenWidth] = useState<number>(window.screen.width);

  useEffect(() => {
    const screenOrientationHandler = () => {
      setScreenWidth(window.screen.width);
    };

    window.addEventListener('orientationchange', screenOrientationHandler);

    return () => {
      window.removeEventListener('orientationchange', screenOrientationHandler);
    };
  }, []);

  return screenWidth;
};

export default useScreenWidth;
