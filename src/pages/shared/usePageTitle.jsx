import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const usePageTitle = (defaultTitle) => {
  const location = useLocation();

  useEffect(() => {
    const route = location.pathname.replace('/', '');
    document.title = route ? `${defaultTitle} | ${route}` : defaultTitle;
  }, [location.pathname, defaultTitle]);
};

export default usePageTitle;
