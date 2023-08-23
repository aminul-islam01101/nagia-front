import Image from 'next/image';
import { BsArrowUpLeft } from 'react-icons/bs';
import grain from '@/assets/grain.svg';
import { ButtonFill, ButtonsOutline } from '@/component/Misc/Buttons';
import styles from './dashboardhome.module.scss';
import Popup from 'reactjs-popup';
import BuyProduct from '../DashboardMarket/BuyProduct';
import Link from 'next/link';
import { useGetOpportunityQuery } from '@/states/services/userApi';

const DashboardProduct = ({ btn_text, type, opportunity }) => {
  // console.log(opportunity);
  return (
    <div className={'styles.dashboardproduct'}>
      {opportunity?.opportunity.slice(0, 3).map((opp) => {
        return (
          <div className={styles.dashboardproduct} key={opp.id}>
            <div className={styles.productinfo}>
              <div className={styles.name}>
                <div className={styles.name__image}>
                  <Image src={opp.image} alt='grain' width={100} height={100} />
                </div>
                <div className={styles.name__text}>
                  <h3>{opp.title}</h3>
                  {type === 'portfolio' && <p>10 bags</p>}
                </div>
              </div>
              <div className={styles.price}>
                <p>NGN {opp.amount}</p>
                {/* <div className={styles.percent}>
                  <p>+0.25%</p>
                  <BsArrowUpLeft size={15} />
                </div> */}
              </div>
            </div>
            <div className={styles.marketbtn}>
              {type === 'gainers' ? (
                //<Popup
                //trigger={
                <Link href={`/dashboard/buyproduct/${opp?.id}`}>
                  <div className={styles.addnewbtn}>
                    <ButtonFill text='Buy Now' />
                  </div>
                </Link>
              ) : (
                //   }
                //   // position={["bottom center", "bottom right", "bottom left"]}
                //   // closeOnDocumentClick
                //   // keepTooltipInside={styles.tooltipBoundary}
                //   arrow={false}
                //   nested
                //   modal
                // >
                //   <BuyProduct product={opp} />
                // </Popup>
                // <ButtonFill text={btn_text} />
                <Popup
                  trigger={
                    <div className={styles.addnewbtn}>
                      <ButtonsOutline text={btn_text} />
                    </div>
                  }
                  position={['bottom center', 'bottom right', 'bottom left']}
                  // closeOnDocumentClick
                  // keepTooltipInside={styles.tooltipBoundary}
                  arrow={false}
                  nested
                  modal
                >
                  {/* <SellProduct product={opp} /> */}
                </Popup>
                // <ButtonsOutline text={btn_text} />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DashboardProduct;
