import Image from 'next/image';
import Link from 'next/link';
import styles from './dashboardhome.module.scss';
import news from '@/assets/news.svg';
import { useGetAllNewsQuery } from '@/states/services/overlappingApi';
import { useState } from 'react';
import moment from 'moment';

export const initialQuery = {
  page: 1,
  limit: 10,
  search: '',
};

const News = () => {
  const [query, setQuery] = useState(initialQuery);

  const { data: newsData, isFetching: isLoading } = useGetAllNewsQuery(query);

  return (
    <div className={styles.newsstyles}>
      <div className={styles.heading}>
        <h2>News</h2>
        {/* <Link href='#'>View All</Link> */}
      </div>
      <div className={styles.news}>
        {newsData?.data?.news
          .slice(0, 3)
          .reverse()
          .map((newsList) => {
            return (
              <div key={newsList.id} className={styles.news__single}>
                <div className={styles.news__img}>
                  <Image
                    src={newsList.image}
                    width={50}
                    height={50}
                    alt='news'
                  />
                </div>
                <div className={styles.news__content}>
                  <h3>{newsList.title}</h3>
                  <div className={styles.news__meta}>
                    <p>{newsList.source}</p>
                    <p style={{ color: '#D9D9D9' }}>&#x2022;</p>
                    <p>{moment(newsList?.createdAt).format('MMMM D, YYYY')}</p>
                  </div>
                  <div className={styles.news__excerpt}>
                    <p>
                      {newsList.description} {''}
                      <span>
                        <a href={newsList.link}>read more</a>
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default News;
