import { useEffect } from 'react';
import Router from 'next/router';

const Logout = () => {
  useEffect(() => {
    const { pathname } = Router;
    // conditional redirect
    if (pathname == '/logout' ) {
      // clear local storage
      localStorage.clear();
      // redirect to login page
      Router.push('/login');
    }
  },[]);
};
export default Logout;
