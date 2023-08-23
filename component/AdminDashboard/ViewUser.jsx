import { useGetAccountDetailsQuery } from '@/states/services/userApi';
import styles from './admin.module.scss';
import moment from 'moment';

const ViewUser = ({ email, close, data }) => {
  console.log(data);
  // console.log(data.phoneNumber);
  return (
    <div className={styles.viewuser}>
      <h2>User Details</h2>
      <br />
      <div className={styles.viewuser__userdetails}>
        <p>
          <span> Date Created: </span>
          {moment(data?.createdAt).format('MMMM D, YYYY')}
        </p>
        <p>
          <span>Email: </span>
          {data.email}
        </p>
        <p>
          <span> Verification Status: </span>
          {data.isVerified ? 'Verified' : 'Not Verified'}
        </p>
        <p>
          <span> Account Type: </span>
          {data.role}
        </p>
        <p>
          <span> Username: </span>
          {data.username}
        </p>
       
      </div>
    </div>
  );
};

export default ViewUser;
