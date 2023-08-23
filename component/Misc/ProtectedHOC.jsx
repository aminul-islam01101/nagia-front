import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
// import Loader from "./../Loader/index";

const ProtectedHOC = (WrappedComponent) => {
  return (props) => {
    //Loading state
    const [loading, setLoading] = useState(true);
    // Auth State
    const { authorization } = useSelector((state) => state.authStore);

    const router = useRouter();
    // console.log(router.pathname);

    useEffect(() => {
      if (!authorization.accessToken) {
        router.push('/');
      } else {
        setLoading(false);
      }
    }, [authorization, router]);

    if (loading) return;
    // <Loader />;
    <div>Loading</div>;
    return <WrappedComponent {...props} />;
  };
  return null;
};

export default ProtectedHOC;
