import { useGetAllOpportunitiesQuery } from '@/states/services/overlappingApi';
import styles from './ticker.module.scss';
import { useState } from 'react';

export const initialQuery = {
  page: 1,
  limit: 10,
  search: '',
};

const Ticker = () => {
  const [query, setQuery] = useState(initialQuery);

  //GET ALL OPPORTUNITIES FOM REDUX
  const { data: opportunity, isFetching: isLoadingOpp } =
    useGetAllOpportunitiesQuery(query);

  // console.log(opportunity);

  return (
    <div className={styles.ticker}>
      <div className={styles.heading}>
        <h2>Real-time data</h2>
      </div>
      <marquee behavior='' direction=''>
        <div className={styles.products}>
          {opportunity?.data.opportunity.map((item) => {
            return (
              <div className={styles.product} key={item.id}>
                <h3>{item.title}</h3>
                <p>{item.amount}</p>
              </div>
            );
          })}
        </div>
      </marquee>
    </div>
  );
};

export default Ticker;
