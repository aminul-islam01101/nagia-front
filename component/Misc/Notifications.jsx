import { BsCheck2All, BsDot } from 'react-icons/bs';
import styles from './misc.module.scss';
import Link from 'next/link';
import moment from 'moment';
import { useMarkNotficationAsReadMutation } from '@/states/services/userApi';

const Notifications = ({ notifications, type }) => {
  // console.log(notifications);
  const [markRead, { data, isLoading, isSuccess, isError, error }] =
    useMarkNotficationAsReadMutation();

  const handleMarkRead = (id) => {
    markRead(id);
  };

  return (
    <div
      className={styles.notifications}
      style={{ maxWidth: type !== 'page' ? '445px' : '100%' }}
    >
      <div className={styles.notifications__heading}>
        <h2>Notifications</h2>
        {/* <div className={styles.mark}>
          <BsCheck2All color='#2461ff' size={16} />
          <p>mark all as read</p>
        </div> */}
      </div>
      <div className={styles.notifications__list}>
        {type !== 'page' ? (
          <ul>
            {notifications?.data.data.slice(0, 3).map((item) => {
              return (
                <li key={item.id} onClick={() => handleMarkRead(item.id)}>
                  {!item.read && (
                    <div className={styles.read}>
                      <BsDot color='#2461ff' size={40} />
                    </div>
                  )}
                  <div className={styles.notifications__message}>
                    <p>{item.message}</p>
                    <div className={styles.notifications__time}>
                      <p>{moment(item.createdAt).format('MMMM D, YYYY')}</p>
                      <BsDot color='#8a8a8a' size={24} />
                      <p> {moment(new Date(item.createdAt)).format('h:mma')}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <ul>
            {notifications?.data.data.map((item) => {
              return (
                <li key={item.id} onClick={() => handleMarkRead(item.id)}>
                  {!item.read && (
                    <div className={styles.read}>
                      <BsDot color='#2461ff' size={40} />
                    </div>
                  )}
                  <div className={styles.notifications__message}>
                    <p>{item.message}</p>
                    <div className={styles.notifications__time}>
                      <p>{moment(item.createdAt).format('MMMM D, YYYY')}</p>
                      <BsDot color='#8a8a8a' size={24} />
                      <p> {moment(new Date(item.createdAt)).format('h:mma')}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
      {type !== 'page' ? (
        <div className={styles.viewall}>
          <Link href='dashboard/notifications'>View all Notifications</Link>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Notifications;
