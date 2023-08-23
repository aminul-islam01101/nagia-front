import Image from 'next/image';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import userImg from '@/assets/settingsuser.svg';
import styles from './misc.module.scss';
import React from 'react';
import Popup from 'reactjs-popup';
import UserDropdown from './UserDropdown';
import { useSelector } from 'react-redux';

const UserInfo = () => {
  const { user } = useSelector((state) => state.authStore);

  // console.log(user);
  return (
    <Popup
      trigger={
        <div className={styles.userinfo}>
          <Image src={userImg} alt='user' />
          <h3>{user?.username}</h3>
          <button type='button' className={styles.trigger}>
            <MdOutlineKeyboardArrowDown size={20} />
          </button>
        </div>
      }
      position={['bottom center', 'bottom right', 'bottom left']}
      closeOnDocumentClick
      keepTooltipInside={styles.tooltipBoundary}
      arrow={false}
    >
      <UserDropdown />
    </Popup>
  );
};

export default UserInfo;
