import Image from 'next/image';
import styles from './history.module.scss';
import userImage from '@/assets/user.svg';
import { MdDelete } from 'react-icons/md';
import SendMailPopup from '@/component/AdminDashboard/SendMailPopup';
import SendEmail from '@/component/AdminDashboard/SendEmail';
import Delete from '@/component/AdminDashboard/Delete';
import moment from 'moment';
import {
  useApproveTransactionMutation,
  useDeleteUserMutation,
} from '@/states/services/adminApi';
import Popup from 'reactjs-popup';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import ViewUserDetails from '@/component/AdminDashboard/ViewAccountDetails';
import ViewAccountDetails from '@/component/AdminDashboard/ViewAccountDetails';
import ViewUser from '@/component/AdminDashboard/ViewUser';
SendMailPopup;

const Table = ({ header, data, type, transactionType }) => {
  const [
    approveSell,
    { data: approveSellRes, isLoading, isSuccess, isError, error },
  ] = useApproveTransactionMutation();

  useEffect(() => {
    if (error) {
      toast.error(error?.data.message);
    }

    if (isSuccess) {
      toast.success(approveSellRes?.message);
    }
  }, [error, error?.data.message, isSuccess, approveSellRes]);

  return (
    <div className={styles.table}>
      <table>
        <thead>
          <tr>
            {header?.map((title, i) => (
              <th key={i}>{title}</th>
            ))}
          </tr>
        </thead>
        {data?.length > 0 ? (
          <tbody>
            {data?.map((data, i) => {
              if (type === 'adminhistorywithdraw') {
                return (
                  <AdminHistoryWithdraw
                    key={i}
                    data={data}
                    approveSell={approveSell}
                  />
                );
              }
              if (type === 'adminhistorydeposit') {
                return <AdminHistoryDeposit key={i} data={data} />;
              }
              if (type === 'userhistory') {
                return <UserHistory key={i} data={data} />;
              }
              if (type === 'adminusers') {
                return <AdminUsers key={i} data={data} user={data} />;
              }
              if (type === 'account') {
                return <UserAccount key={i} data={data} user={data} />;
              }
            })}
          </tbody>
        ) : (
          <tbody>
            <tr>
              <td>No Data</td>
            </tr>
          </tbody>
        )}
      </table>
    </div>
  );
};

export default Table;

const UserHistory = ({ data }) => {
  return (
    <tr key={data.id}>
      <td>{data?.transactionType}</td>
      <td>{moment(data?.createdAt).format('MMMM D, YYYY')}</td>
      <td>{data?.id}</td>
      <td>{data?.investmentOpportunity.title}</td>
      <td>{data?.status}</td>
    </tr>
  );
};

const AdminHistoryWithdraw = ({ data, approveSell }) => {
  const values = {
    userInvestmentId: data?.UserInvestment.id,
    transactionId: data?.id,
    quantity: data?.quantity,
  };

  //SEND MAIL HANDLER
  const handleSubmit = async () => {
    await approveSell(values);
  };

  const ref = useRef();
  const closeTooltip = () => ref.current.close();

  return (
    <tr key={data.id} className={styles.adminhistorrow}>
      <td className={styles.adminhistorrow__user}>
        <div className={styles.adminhistorrow__userimage}>
          <Image src={userImage} alt='user' />
        </div>
        <div className={styles.username}>
          <Popup
            ref={ref}
            modal
            trigger={
              <h4 style={{ cursor: 'pointer' }}>
                {data?.UserInvestment.user.username}
              </h4>
            }
          >
            <ViewAccountDetails data={data?.bankAccount} close={closeTooltip} />
          </Popup>

          <p>{data?.UserInvestment.user.email}</p>
        </div>
      </td>
      <td>{moment(data?.createdAt).format('MMMM D, YYYY')}</td>
      <td>{data?.id}</td>
      <td>{data?.quantity}</td>
      <td>{data?.UserInvestment.investmentOpportunity.title}</td>
      <td>
        {data?.UserInvestment.investmentOpportunity.amount * data?.quantity}
      </td>
      <td>
        <button
          className={styles.adminhistorrow__adminhistorybtn}
          onClick={handleSubmit}
          disabled={data.approved}
        >
          {data.approved ? 'Approved' : 'Approve'}
        </button>
      </td>
    </tr>
  );
};

const AdminHistoryDeposit = ({ data }) => {
  return (
    <tr key={data.id} className={styles.adminhistorrow}>
      <td className={styles.adminhistorrow__user}>
        <div className={styles.adminhistorrow__userimage}>
          <Image src={userImage} alt='user' />
        </div>
        <div className={styles.username}>
          <h4> {data?.account.username}</h4>
          <p>{data?.account.email}</p>
        </div>
      </td>
      <td>{data?.transactionType}</td>
      <td>{moment(data?.createdAt).format('MMMM D, YYYY')}</td>
      <td>{data?.id}</td>
      <td>{data?.investmentOpportunity.title}</td>
      <td>{data?.amount}</td>
      {/* <td>
      <button className={styles.adminhistorrow__adminhistorybtn}>
        {data?.action}
      </button>
    </td> */}
    </tr>
  );
};

const AdminUsers = ({ data, user }) => {
  //DELETE USER MUTATION FOM REDUX
  const [deleteUser, { data: userData, isLoading, isSuccess, isError, error }] =
    useDeleteUserMutation();
  const ref = useRef();
  const mailRef = useRef();
  const closeTooltip = () => ref.current.close();

  return (
    <tr key={data.id} className={styles.adminuserrow}>
      {/* <td>
        <input type='checkbox' name='' id='' />
      </td> */}
      <td className={styles.adminuserrow__user}>
        <div className={styles.adminuserrow__userimage}>
          <Image src={userImage} alt='user' />
        </div>
        <div className={styles.username}>
          <h4> {user.username}</h4>
          <p>{user.email}</p>
        </div>
      </td>
      <td>{moment(user?.createdAt).format('MMMM d, YYYY')}</td>
      {/* <td>{data?.lastActive}</td> */}
      <td className={styles.adminuserrowbtns}>
        <Popup
          ref={ref}
          modal
          trigger={<button className='button'> Send Mail </button>}
        >
          <SendEmail email={user?.email} close={closeTooltip} />
        </Popup>
        <Popup
          ref={ref}
          modal
          trigger={
            <button className={styles.adminuserrowbtn}>View Account</button>
          }
        >
          <ViewUser data={data} close={closeTooltip} />
        </Popup>
        <div className={styles.delete}>
          {/* <SendMailPopup
            ref={ref}
            trigger={<MdDelete size={20} color=" #FF2C2C" cursor="pointer" />}
          > */}
          <Popup
            ref={ref}
            trigger={<MdDelete size={20} color=' #FF2C2C' cursor='pointer' />}
            arrow={false}
            modal
          >
            <Delete
              deleteFuntion={deleteUser}
              id={user.id}
              close={closeTooltip}
            />
          </Popup>
        </div>
      </td>
    </tr>
  );
};

const UserAccount = ({ data, test }) => {
  return (
    <tr key={data.id}>
      <td>{data?.accountHolderName}</td>
      <td>{data?.accountNumber}</td>
      <td>{data?.bankName}</td>
      <td></td>
    </tr>
  );
};
