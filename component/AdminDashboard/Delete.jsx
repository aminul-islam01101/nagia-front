import warning from '@/assets/warning.svg';
import Image from 'next/image';
import styles from './admin.module.scss';
import { MdDelete } from 'react-icons/md';
import {
  useDeleteNewsMutation,
  useDeleteOpportunityMutation,
  useDeleteUserMutation,
} from '@/states/services/adminApi';

const Delete = ({ id, close, deleteFuntion }) => {
  const deleteHandler = async () => {
    await deleteFuntion(id);
    close();
  };

  return (
    <div className={styles.delete}>
      <Image src={warning} alt='warning sign' />
      <div className={styles.text}>
        <h2>Delete Item</h2>
        <p>
          Are you sure you want to delete this item? Action cannot be undone
        </p>
      </div>
      <div className={styles.btns}>
        <button onClick={() => close()}>cancel</button>
        <button onClick={deleteHandler}>
          {' '}
          <MdDelete /> delete
        </button>
      </div>
    </div>
  );
};

export default Delete;
