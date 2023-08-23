import ButtonWithLoader from '@/component/Misc/ButtonWithLoader';
import Loader from '@/component/Misc/Loader';
import {
  useVerifyPaymentMutation,
  useVerifyPaymentQuery,
} from '@/states/services/userApi';
import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import styles from './verify.module.scss';
import Link from 'next/link';

const Callback = () => {
  const router = useRouter();
  const [reverifyTrue, setReverifyTrue] = useState(false);
  const [skip, setSkip] = React.useState(true);
  const reference = router.query.reference;
  const userInvestmentId =
    typeof window !== 'undefined'
      ? window.localStorage.getItem('userInvId')
      : false;

  const checkoutId =
    typeof window !== 'undefined'
      ? window.localStorage.getItem('checkoutId')
      : false;

  const {
    data: verify,
    isFetching: isLoading,
    isSuccess,
    isError,
    error,
  } = useVerifyPaymentQuery(
    {
      reference,
      userInvestmentId,
      checkoutId,
    },
    {
      skip,
    }
  );

  console.log('🌼 🔥🔥 file: callback.js:46 🔥🔥 Callback 🔥🔥  verify🌼',  verify);
  console.log('🌼 🔥🔥 file: callback.js:46 🔥🔥 Callback 🔥🔥  error,🌼',  error,);

  const reverify = () => {
    window.location.reload();
  };

  // console.log(router);

  useEffect(() => {
    if (reference !== undefined) {
      setSkip(false);
    }

    if (isSuccess) {
      router.push('/dashboard/myportfolio');
    }
    if (isError) {
      toast.error('Error occured. Try again or contact support');
      router.push('/dashboard');
    }
  }, [reference, router, isError, isSuccess]);

  // if (isError) {
  //   return (
  //     <div className={styles.reverify}>
  //       <h2>Reverify your purchase</h2>
  //       <div className={styles.button}>
  //         <div onClick={reverify}>
  //           <ButtonWithLoader btnType='button' btnText='Reverify' />
  //         </div>
  //         <button>
  //           {' '}
  //           <Link href='/dashboard'>Go to Dashboard</Link>
  //         </button>
  //       </div>
  //       <p>If purchase verification does not work, please contact support</p>
  //       <Toaster />
  //     </div>
  //   );
  // } else {
  return (
    <div>
      <Loader />
      <Toaster />
    </div>
  );
  // }
};

export default Callback;
