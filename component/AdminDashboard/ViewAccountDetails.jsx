import styles from './admin.module.scss';
import { useGetAccountDetailsAdminQuery } from '@/states/services/adminApi';

const ViewAccountDetails = ({ email, close, data }) => {
  // console.log(data);

  const {
    data: account,
    isFetching,
    isError,
  } = useGetAccountDetailsAdminQuery(data);

  return (
    <div className={styles.sendemail}>
      <h2>User Details</h2>
    </div>
  );
};

export default ViewAccountDetails;
