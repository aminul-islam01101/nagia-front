import { TinyLoader } from '@/component/Misc/Loader';
import styles from './dashboardportfolio.module.scss';

const PortfolioCard = ({ title, number, produce, color, type }) => {
  return (
    <div className={styles.portfoliocard}>
      {number !== undefined ? (
        <>
          <h2>{title}</h2>
          <h3 style={{ color: color }}>
            {number}
            {type === 'percent' ? '%' : ''}
          </h3>
          <p>{produce}</p>
        </>
      ) : (
        <TinyLoader />
      )}
    </div>
  );
};

export default PortfolioCard;
