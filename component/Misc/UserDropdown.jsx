import styles from './misc.module.scss';
import logout from '@/assets/logout.svg';
import profile from '@/assets/profile.svg';
import Link from 'next/link';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { logout as logOut, reset } from '@/states/slices/authSlice';
import {
  useLogoutUserMutation,
  useLogoutUserQuery,
} from '@/states/services/authApi';
import { useEffect, useState } from 'react';

const UserDropdown = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [skip, setSkip] = useState(true);
  const { isLoading, isSuccess, isError } = useLogoutUserQuery(undefined, {
    skip,
  });
  const handleLogout = () => {
    setSkip(false);
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch({ type: 'LOGOUT' });
      router.push('/');
    }
    if (isError) {
      dispatch({ type: 'LOGOUT' });
      router.push('/');
    }
  }, [dispatch, isError, router, isSuccess, skip]);

  return (
    <div className={styles.userdropdown}>
      <Link href='/dashboard/settings'>
        <Image src={profile} alt='profile icon' /> <p>My Profile</p>
      </Link>
      <div className='' onClick={handleLogout}>
        <div className={styles.userdropdownitem}>
          <Image src={logout} alt='logout icon' /> <p>Logout</p>
        </div>
      </div>
    </div>
  );
};

export default UserDropdown;
