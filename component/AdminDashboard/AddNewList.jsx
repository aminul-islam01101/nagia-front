import Popup from 'reactjs-popup';
import styles from './admin.module.scss';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import InvestorOpp from './InvestorOpp';
import InvestorNews from './InvestorNews';
import { useRef } from 'react';

const AddNewList = () => {
  const ref = useRef();
  const closeTooltip = () => ref.current.close();
  // console.log(ref);
  return (
    <div className={styles.addnewlist}>
      <Popup
        ref={ref}
        trigger={
          <div className={styles.addnewlist__item}>
            {' '}
            Investment Opportunities{' '}
          </div>
        }
        modal
      >
        <InvestorOpp close={closeTooltip} />
      </Popup>
      <Popup
        trigger={<p className={styles.addnewlist__item}> Investment News </p>}
        modal
      >
        <InvestorNews />
      </Popup>
    </div>
  );
};

export default AddNewList;
