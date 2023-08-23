import AdminFilter from '@/component/AdminDashboard/AdminFilter';
import DashboardPage from '@/component/DashboardGlobalComponents/DashboardPage';
import Table from '@/component/UserDashboard/DashboardHistory/Table';
import { adminHistory } from '@/utils/adminHistory';
import styles from './admin.module.scss';
import Addnew from '@/component/AdminDashboard/Addnew';
import ProtectedHOCAdmin from '@/component/Misc/ProtectedHOCAdmin';
import {
  useApproveTransactionMutation,
  useGetAllTransactionsQuery,
  useGetUsersProductApproveQuery,
} from '@/states/services/adminApi';
import { useEffect, useState } from 'react';
import { TabSelector } from '@/component/Misc/Tabselector';
import { TabPanel, useTabs } from 'react-headless-tabs';
import ReactPaginate from 'react-paginate';
import { Toaster, toast } from 'react-hot-toast';

export const initialQueryDeposit = {
  page: 1,
  limit: 10,
  search: '',
};

export const initialQueryCashout = {
  page: 1,
  limit: 10,
  search: '',
};

const History = () => {
  const [queryDeposit, setQueryDeposit] = useState(initialQueryDeposit);
  const [queryCashout, setQueryCashout] = useState(initialQueryCashout);
  const [selectedTab, setSelectedTab] = useTabs(['cashout', 'deposit']);

  const headerDeposit = [
    'Name',
    'Transaction Type',
    'Date',
    'Transaction ID',
    'Product',
    'Amount',
  ];

  const headerWithdraw = [
    'Name',
    'Date',
    'Transaction ID',
    'Quantity',
    'Product',
    'Amount',
    'Action',
  ];

  //GET ALL OPPORTUNITIES FOM REDUX
  const {
    data: toApprove,
    isFetching: isLoadingOpp,
    isError: isErrorOpp,
  } = useGetUsersProductApproveQuery(queryCashout);

  //GET ALL TRANSACTIONS FOM REDUX
  const {
    data: allTransactions,
    isFetching,
    isError: isErrorTransaction,
  } = useGetAllTransactionsQuery(queryDeposit);

  const handlePageClickDeposit = async (data) => {
    // console.log(data.selected);

    let currentPage = data.selected + 1;

    setQueryDeposit({ ...queryDeposit, page: currentPage });
  };

  const handlePageClickCashout = async (data) => {
    // console.log(data.selected);

    let currentPage = data.selected + 1;

    setQueryCashout({ ...queryCashout, page: currentPage });
  };

  const pageCountWithdrawal = toApprove?.data.totalPage;
  const pageCountDeposit = allTransactions?.data.totalPage;

  return (
    <DashboardPage title='History' type='admin'>
      <div className={styles.history}>
        {/* <AdminFilter /> */}
        <nav className={styles.tabsheading}>
          <div className={styles.tabs}>
            <TabSelector
              isActive={selectedTab === 'cashout'}
              onClick={() => setSelectedTab('cashout')}
            >
              Cashout
            </TabSelector>
            <TabSelector
              isActive={selectedTab === 'deposit'}
              onClick={() => setSelectedTab('deposit')}
            >
              Deposit
            </TabSelector>
          </div>
          {/* <DataFilter outerBackground="#FFFFFF" inner="#F3EEEB" /> */}
        </nav>
        <div className={styles.tabcontent}>
          <TabPanel hidden={selectedTab !== 'cashout'}>
            <div className={styles.table}>
              <Table
                data={toApprove?.data.sell}
                header={headerWithdraw}
                type='adminhistorywithdraw'
              />

              <ReactPaginate
                previousLabel={'< Prev'}
                nextLabel={'Next >'}
                breakLabel={'...'}
                pageCount={pageCountWithdrawal}
                marginPagesDisplayed={2}
                pageRangeDisplayed={3}
                onPageChange={handlePageClickCashout}
                containerClassName={styles.pagination}
                pageClassName={styles.page_item}
                pageLinkClassName={styles.page_link}
                previousClassName={styles.page_item}
                previousLinkClassName={`${styles.page_link} ${styles.page_link_prev}`}
                nextClassName={styles.page_item}
                nextLinkClassName={`${styles.page_link} ${styles.page_link_next}`}
                breakClassName={styles.page_item}
                breakLinkClassName={styles.page_link}
                activeClassName={styles.active}
              />
            </div>
          </TabPanel>
          <TabPanel hidden={selectedTab !== 'deposit'}>
            <div className={styles.table}>
              <Table
                data={allTransactions?.data.transaction}
                header={headerDeposit}
                type='adminhistorydeposit'
              />
              <ReactPaginate
                previousLabel={'< Prev'}
                nextLabel={'Next >'}
                breakLabel={'...'}
                pageCount={pageCountDeposit}
                marginPagesDisplayed={2}
                pageRangeDisplayed={3}
                onPageChange={handlePageClickDeposit}
                containerClassName={styles.pagination}
                pageClassName={styles.page_item}
                pageLinkClassName={styles.page_link}
                previousClassName={styles.page_item}
                previousLinkClassName={`${styles.page_link} ${styles.page_link_prev}`}
                nextClassName={styles.page_item}
                nextLinkClassName={`${styles.page_link} ${styles.page_link_next}`}
                breakClassName={styles.page_item}
                breakLinkClassName={styles.page_link}
                activeClassName={styles.active}
              />
            </div>
          </TabPanel>
        </div>
        <Toaster />
      </div>
    </DashboardPage>
  );
};

export default ProtectedHOCAdmin(History);
