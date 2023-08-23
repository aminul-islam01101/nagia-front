import Image from 'next/image';
import { BsArrowUpLeft } from 'react-icons/bs';
import grain from '@/assets/grain.svg';
import { ButtonFill, ButtonsOutline } from '@/component/Misc/Buttons';
import styles from './dashboardhome.module.scss';
import Popup from 'reactjs-popup';
import BuyProduct from '../DashboardMarket/BuyProduct';
import SellProduct from '../SellProduct';
import { useRef, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';

const DashboardProductSell = ({ btn_text, type, opportunity }) => {
  const ref = useRef();
  const closeTooltip = () => ref.current.close();

  return (
    <div className={'styles.dashboardproduct'}>
      <div className={styles.dashboardproduct}>
        <div className={styles.productinfo}>
          <div className={styles.name}>
            <div className={styles.name__image}>
              <Image
                src={opportunity.investmentOpportunity.image || grain}
                alt='grain'
                width={100}
                height={100}
              />
            </div>
            <div className={styles.name__text}>
              <h3>{opportunity.investmentOpportunity.title}</h3>
              <p>{opportunity.quantity}</p>
            </div>
          </div>
          <div className={styles.price}>
            <p>NGN {opportunity.purchasePrice}</p>
          </div>
        </div>
        <div className={styles.marketbtn}>
          {type === 'gainers' ? (
            <Popup
              ref={ref}
              trigger={
                <div className={styles.addnewbtn}>
                  <ButtonFill text='Buy Now' />
                </div>
              }
              position={['bottom center', 'bottom right', 'bottom left']}
              arrow={false}
              nested
              modal
            >
              <BuyProduct product={opp} />
            </Popup>
          ) : (
            <Popup
              ref={ref}
              trigger={
                <div className={styles.addnewbtn}>
                  <ButtonsOutline text={btn_text} />
                </div>
              }
              position={['bottom center', 'bottom right', 'bottom left']}
              arrow={false}
              nested
              modal
            >
              <SellProduct product={opportunity} close={closeTooltip} />
            </Popup>
          )}
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default DashboardProductSell;
