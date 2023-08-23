import AdminFilter from '@/component/AdminDashboard/AdminFilter';
import DashboardPage from '@/component/DashboardGlobalComponents/DashboardPage';
import Table from '@/component/UserDashboard/DashboardHistory/Table';
import styles from './admin.module.scss';
import { adminHistory } from '@/utils/adminHistory';
import Addnew from '@/component/AdminDashboard/Addnew';
import { TabPanel, useTabs } from 'react-headless-tabs';
import { TabSelector } from '@/component/Misc/Tabselector';
import ContentTable from '@/component/AdminDashboard/ContentTable';
import { useEffect, useState } from 'react';
import {
  useGetAllNewsQuery,
  useGetAllOpportunitiesQuery,
} from '@/states/services/overlappingApi';
import ProtectedHOCAdmin from '@/component/Misc/ProtectedHOCAdmin';
import ReactPaginate from 'react-paginate';
import { Toaster, toast } from 'react-hot-toast';

export const initialQuery = {
  page: 1,
  limit: 10,
  search: '',
};

const Content = () => {
  const [query, setQuery] = useState(initialQuery);

  const newsHeader = [
    // <input type='checkbox' name='' id='' key='check' />,
    'Image and Title',
    'Description',
    'Date',
    'Action',
  ];

  const oppHeader = [
    ,
    // <input type='checkbox' name='' id='' key='check' />,
    'Image and Title',
    'Amount',
    'Date',
    'Action',
  ];

  const { data: news, isFetching: isLoading } = useGetAllNewsQuery(query);

  const { data: opportunity, isFetching: isLoadingOpp } =
    useGetAllOpportunitiesQuery(query);

  const handlePageClick = async (data) => {
    // console.log(data.selected);

    let currentPage = data.selected + 1;

    setQuery({ ...query, page: currentPage });
  };

  const pageCountOpp = opportunity?.data.totalPage;
  const pageCountNews = news?.data.totalPage;

  const [selectedTab, setSelectedTab] = useTabs(['news', 'opportunity']);
  return (
    <DashboardPage title='Content' type='admin'>
      <div className={styles.content}>
        <div className={styles.top}>
          {/* <AdminFilter /> */}
          <Addnew />
        </div>
        <div className={styles.content__main}>
          <nav className={styles.content__tabsheading}>
            <TabSelector
              isActive={selectedTab === 'news'}
              onClick={() => setSelectedTab('news')}
            >
              Investment News
            </TabSelector>
            <TabSelector
              isActive={selectedTab === 'opportunity'}
              onClick={() => setSelectedTab('opportunity')}
            >
              Investment Opportunity
            </TabSelector>
          </nav>
          <div className={styles.tabcontent}>
            <TabPanel hidden={selectedTab !== 'news'}>
              <ContentTable
                data={news?.data.news}
                header={newsHeader}
                type='contentNews'
              />
              <ReactPaginate
                previousLabel={'< Prev'}
                nextLabel={'Next >'}
                breakLabel={'...'}
                pageCount={pageCountNews}
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
            </TabPanel>
            <TabPanel hidden={selectedTab !== 'opportunity'}>
              <ContentTable
                data={opportunity?.data.opportunity}
                header={oppHeader}
                type='ContentOpp'
              />
              <ReactPaginate
                previousLabel={'< Prev'}
                nextLabel={'Next >'}
                breakLabel={'...'}
                pageCount={pageCountOpp}
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
            </TabPanel>
          </div>
        </div>
      </div>
      <Toaster />
      <div className={styles.table}></div>
    </DashboardPage>
  );
};

export default ProtectedHOCAdmin(Content);
