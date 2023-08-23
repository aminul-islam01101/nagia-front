import Notifications from '@/component/Misc/Notifications';
import styles from './dashboard.module.scss';
import { useGetAllNotficationsQuery } from '@/states/services/userApi';
import { useState } from 'react';
import DashboardPage from '@/component/DashboardGlobalComponents/DashboardPage';

export const initialQuery = {
  page: 1,
  limit: 10,
  search: '',
};

const Notification = () => {
  const [query, setQuery] = useState(initialQuery);

  const { data: notifications, isFetching: isLoading } =
    useGetAllNotficationsQuery(query);

  return (
    <DashboardPage title=''>
      <div className={styles.notifications}>
        <div className={styles.notifications__inner}>
          <Notifications notifications={notifications} type='page' />
        </div>
      </div>
    </DashboardPage>
  );
};

export default Notification;
