// useRootClass.js
import { useEffect } from 'react';
// import { useLocation } from 'react-router-dom';

function useRootClass(className) {
  useEffect(() => {
    const rootElement = document.getElementById('root');
    rootElement.classList.add(className);

    // Cleanup to remove the class when the component unmounts
    return () => {
      rootElement.classList.remove(className);
    };
  }, [className]);
}

export default useRootClass;
