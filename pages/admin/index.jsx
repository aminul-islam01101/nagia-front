import AdminFilter from '@/component/AdminDashboard/AdminFilter';
import DashboardPage from '@/component/DashboardGlobalComponents/DashboardPage';
import styles from './admin.module.scss';
import { adminUsers } from '@/utils/adminUsers';
import Table from '@/component/UserDashboard/DashboardHistory/Table';
import { useDeleteSellMutation, useDeleteTransactionsMutation, useDeleteUserInvestmentMutation, useGetAllUsersQuery } from '@/states/services/adminApi';
import Pagination from '@/component/Misc/Pagination';
import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import ProtectedHOCAdmin from '@/component/Misc/ProtectedHOCAdmin';
import { Toaster } from 'react-hot-toast';

export const initialQuery = {
  page: 1,
  limit: 10,
  search: '',
};

const User = () => {
  const [query, setQuery] = useState(initialQuery);

  const header = [
    'Name',
    'Date registered',

    // 'Last active',
    'Action',
  ];

  const { data: users, isFetching: isLoading } = useGetAllUsersQuery(query);
  const [deleteSell, { data: sellData,  }] =
  useDeleteSellMutation();
  const [deleteUserInvestment, { data: userInvestment,  }] =
  useDeleteUserInvestmentMutation();
  const [deleteTransactions, { data: transactions,  }] =
  useDeleteTransactionsMutation();
console.log(sellData)
  const handlePageClick = async (data) => {
    // console.log(data);

    let currentPage = data.selected + 1;

    setQuery({ ...query, page: currentPage });
  };

  const pageCount = users?.data.totalPage;
  const handleDeleteSell =async () => {
   await deleteSell ()
  }
  const handleDeleteInvestment =async () => {
   await deleteUserInvestment ()
  }
  const handleDeleteTransaction =async () => {
   await deleteTransactions ()
  }

  return (
    <DashboardPage title='Users' type='admin'>
       <button type="button" onClick={handleDeleteSell} className="">delete sell rows</button>
       <button type="button" onClick={handleDeleteInvestment} className="">delete investment rows</button>
       <button type="button" onClick={handleDeleteTransaction} className="">delete transaction rows</button>
      <div className={styles.users}>
        {/* <AdminFilter /> */}
        <div className={styles.table}>
          <Table
            // data={adminUsers}
            data={users?.data.users}
            header={header}
            type='adminusers'
          />
        </div>
        {/* <Pagination
          query={query}
          // count={users?.meta.total}
          // limit={users?.meta.per_page}
          setQuery={setQuery}
        /> */}
        <ReactPaginate
          previousLabel={'< Prev'}
          nextLabel={'Next >'}
          breakLabel={'...'}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
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
        <Toaster />
      </div>
    </DashboardPage>
  );
};

export default ProtectedHOCAdmin(User);
