import Image from 'next/image';
import styles from './dashboardmarket.module.scss';
import potato from '@/assets/potato.svg';
import { BsArrowUpLeft } from 'react-icons/bs';
import { ButtonFill } from '@/component/Misc/Buttons';
import { useState } from 'react';
import Popup from 'reactjs-popup';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';

import Link from 'next/link';

const MyMarket = ({ product, price, percentage, equity, opportunity, handleBuyProduct }) => {
  return opportunity?.opportunity.length > 0 ? (
    <div className={styles.market}>
      {opportunity?.opportunity.map((opp) => {
        return (
          <div className={styles.marketsingle} key={opp.id}>
            <div className={styles.market__image}>
              <Image src={opp.image} alt='potato' width={100} height={100} />
            </div>
            <div className={styles.market__content}>
              <h2>{opp.title}</h2>
              <h3>{opp.amount}</h3>

              
                <div >
                  <button className={styles.backButton} onClick={()=>handleBuyProduct(opp)}>invest</button> 
                </div>
              
            </div>{' '}
          </div>
        );
      })}
    </div>
  ) : (
    <div className={styles.market}>
      <p>No Oppotunity Available</p>
    </div>
  );
};

export default MyMarket;
