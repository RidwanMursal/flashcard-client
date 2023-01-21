import { useState, useEffect } from 'react';



export default function useWindowDimensions() {
  // if (typeof(window) === "undefined") return {width: 0, height: 0}// check if in browser and not server, otherwise will get window undefined error
  const [windowDimensions, setWindowDimensions] = useState({width: 0, height: 0});

  useEffect(() => {
    setWindowDimensions({width: window.innerWidth, height: window.innerheight})
    function handleResize() {
      setWindowDimensions({width: window.innerWidth, height: window.innerheight});
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}
