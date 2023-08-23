import Image from 'next/image';
import styles from '../UserDashboard/DashboardHistory/history.module.scss';
import userImage from '@/assets/user.svg';
import { MdDelete } from 'react-icons/md';
import SendMailPopup from '@/component/AdminDashboard/SendMailPopup';
import SendEmail from '@/component/AdminDashboard/SendEmail';
import Delete from '@/component/AdminDashboard/Delete';
import Link from 'next/link';
SendMailPopup;
import moment from 'moment';
import Popup from 'reactjs-popup';
import { useEffect, useRef, useState } from 'react';
import {
  useDeleteNewsMutation,
  useDeleteOpportunityMutation,
} from '@/states/services/overlappingApi';
import InvestorOppEdit from './InvestorOppEdit';
import InvestorNewsEdit from './InvestorNewsEdit';
import { toast, Toaster } from 'react-hot-toast';

const ContentTable = ({ header, data, type, users }) => {
  const [message, setMessage] = useState('');
  useEffect(() => {
    if (message.type === 'err') {
      toast.error(message.msg);
    }

    if (message.type === 'success') {
      // console.log(message);
    }
  }, [message]);

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

        <tbody>
          {data?.map((content, i) => {
            if (type === 'contentNews') {
              return (
                <InvestorNews
                  setMessage={setMessage}
                  key={i}
                  data={content}
                  type={'ContentNews'}
                />
              );
            }
            if (type === 'ContentOpp') {
              return (
                <InvestorOpp
                  key={i}
                  data={content}
                  type={'ContentOpp'}
                  setMessage={setMessage}
                />
              );
            }
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ContentTable;

const InvestorNews = ({ key, data, type, setMessage }) => {
  const [deleteNews, { data: newsData, isLoading, isSuccess, isError, error }] =
    useDeleteNewsMutation();
  const ref = useRef();
  const closeTooltip = () => ref.current.close();
  return (
    <tr key={key} className={styles.adminuserrow}>
      {/* <td>
        <input type="checkbox" name="" id="" />
      </td> */}
      <>
        <td className={styles.adminuserrow__user}>
          <div className={styles.adminuserrow__userimage}>
            <Image src={data.image} alt='user' width={60} height={60} />
          </div>
          <div className={styles.username}>
            <h4> {data.title}</h4>
            {/* <p>{user.email}</p> */}
          </div>
        </td>
        <td>{data.description}</td>
        <td>{moment(data.createdAt).format('MMMM D, YYYY')}</td>

        <td className={styles.adminuserrowbtns}>
          {/* <SendMailPopup
          trigger={<button className="button"> Send Mail </button>}
          >
          <SendEmail email={user?.email} />
        </SendMailPopup> */}
          <Popup
            ref={ref}
            trigger={<button className={styles.adminuserrowbtn}>Edit</button>}
            arrow={false}
            modal
          >
            <InvestorNewsEdit
              valueNews={data}
              close={closeTooltip}
              setMessage={setMessage}
            />
          </Popup>
          <div className={styles.delete}>
            <Popup
              ref={ref}
              trigger={<MdDelete size={20} color=' #FF2C2C' cursor='pointer' />}
              arrow={false}
              modal
            >
              <Delete
                deleteFuntion={deleteNews}
                id={data.id}
                close={closeTooltip}
                setMessage={setMessage}
              />
            </Popup>
          </div>
        </td>
      </>
    </tr>
  );
};

const InvestorOpp = ({ key, data, type, setMessage }) => {
  const [deleteOpp, { data: oppData, isLoading, isSuccess, isError, error }] =
    useDeleteOpportunityMutation();
  const ref = useRef();
  const closeTooltip = () => ref.current.close();
  return (
    <tr key={key} className={styles.adminuserrow}>
      {/* <td>
        <input type="checkbox" name="" id="" />
      </td> */}
      {/* <Toaster /> */}

      <td className={styles.adminuserrow__user}>
        <div className={styles.adminuserrow__userimage}>
          <Image src={data.image} alt='user' width={60} height={60} />
        </div>
        <div className={styles.username}>
          <h4> {data.title}</h4>
          {/* <p>{user.email}</p> */}
        </div>
      </td>
      <td>NGN {data.amount}</td>
      <td>{moment(data.createdAt).format('MMMM D, YYYY')}</td>
      <td className={styles.adminuserrowbtns}>
        <Popup
          ref={ref}
          trigger={<button className={styles.adminuserrowbtn}>Edit</button>}
          arrow={false}
          modal
        >
          <InvestorOppEdit
            valueOpp={data}
            close={closeTooltip}
            setMessage={setMessage}
          />
        </Popup>
        <div className={styles.delete}>
          <Popup
            ref={ref}
            trigger={<MdDelete size={20} color=' #FF2C2C' cursor='pointer' />}
            arrow={false}
            modal
          >
            <Delete
              deleteFuntion={deleteOpp}
              id={data.id}
              close={closeTooltip}
            />
          </Popup>
        </div>
      </td>
    </tr>
  );
};
