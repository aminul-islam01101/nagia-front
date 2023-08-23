import Image from 'next/image';
import styles from './dashboardportfolio.module.scss';
import corn from '@/assets/corn.svg';
import showchart from '@/assets/showchart.svg';
import { ButtonFill } from '@/component/Misc/Buttons';
import PortfolioChart from './PortfolioChart';
import Popup from 'reactjs-popup';
import ChartModal from './ChartModal';
import SellProduct from '../SellProduct';
import moment from 'moment';
import { useRef } from 'react';

const PortfolioPerfomance = ({ data }) => {
  const ref = useRef();
  const closeTooltip = () => ref.current.close();
  return (
    <div className={styles.portfolioperformance}>
      <div className={styles.details}>
        <div className={styles.details__image}>
          <Image
            src={data.investmentOpportunity.image}
            alt='corn'
            width={100}
            height={100}
          />
        </div>
        <div className={styles.details__content}>
          <h2>{data.investmentOpportunity.title}</h2>
          <div className={styles.details__quantityowned}>
            <div className={styles.details__quantity}>
              <h3>Quantity (Bags)</h3>
              <p>{data.quantity}</p>
            </div>
            <div className={styles.details__since}>
              <h3>Owned since</h3>
              <p>{moment(data.createdAt).format('MMMM D, YYYY')}</p>
            </div>
          </div>
          <div className={styles.details__buttons}>
            {/* <Popup
              trigger={
                <div className={styles.details__showchart}>
                  <Image src={showchart} alt="graph" />
                  <p>View Stats</p>
                </div>
              }
              modal
            >
              {(close) => <ChartModal close={close} />}
            </Popup> */}

            <Popup
              trigger={
                <div className={styles.addnewbtn}>
                  <ButtonFill text='Sell Now' />
                </div>
              }
              ref={ref}
              position={['bottom center', 'bottom right', 'bottom left']}
              // closeOnDocumentClick
              // keepTooltipInside={styles.tooltipBoundary}
              arrow={false}
              nested
              modal
            >
              <SellProduct product={data} close={closeTooltip} />
            </Popup>
          </div>
        </div>
      </div>
      <div className={styles.graph}>
        {/* <PortfolioChart type="portfolio" title="Portfolio Performace" /> */}
      </div>
    </div>
  );
};

export default PortfolioPerfomance;
