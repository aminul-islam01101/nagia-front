import Table from '@/component/UserDashboard/DashboardHistory/Table';
import DashboardPage from '@/component/DashboardGlobalComponents/DashboardPage';
import { TabPanel, useTabs } from 'react-headless-tabs';
import { TabSelector } from '@/component/Misc/Tabselector';
import styles from './dashboard.module.scss';
import DataFilter from '@/component/Misc/DataFilter';
import { transactions } from '@/utils/transactions';
import { useState } from 'react';
import { useGetTransactionHistoryQuery } from '@/states/services/userApi';
import ProtectedHOC from '@/component/Misc/ProtectedHOC';
import { TinyLoader } from '@/component/Misc/Loader';

export const initialQuery = {
  page: 1,
  limit: 10,
  search: '',
};

const History = () => {
  const [selectedTab, setSelectedTab] = useTabs(['all', 'cashout', 'deposit']);
  const [query, setQuery] = useState(initialQuery);

  const header = [
    'Transaction Type',
    'Date',
    'Transaction ID',
    'Product',
    'Status',
  ];

  const { data: transactions, isFetching: isLoading } =
    useGetTransactionHistoryQuery(query);

  return (
    <div>
      {' '}
      <DashboardPage title='History'>
        <div className={styles.history}>
          <nav className={styles.tabsheading}>
            <div className={styles.tabs}>
              <TabSelector
                isActive={selectedTab === 'all'}
                onClick={() => setSelectedTab('all')}
              >
                All
              </TabSelector>
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
            <TabPanel hidden={selectedTab !== 'all'}>
              {' '}
              <div className={styles.table}>
                {!isLoading ? (
                  <Table
                    data={transactions?.data.data.transaction}
                    header={header}
                    type='userhistory'
                  />
                ) : (
                  <TinyLoader />
                )}
              </div>
            </TabPanel>
            <TabPanel hidden={selectedTab !== 'cashout'}>
              {' '}
              {!isLoading ? (
                <Table
                  data={transactions?.data.data.transaction?.filter(
                    (type) => type.transactionType === 'Cashout'
                  )}
                  header={header}
                  type='userhistory'
                  transactionType='Withdrawal'
                />
              ) : (
                <TinyLoader />
              )}
            </TabPanel>
            <TabPanel hidden={selectedTab !== 'deposit'}>
              {!isLoading ? (
                <Table
                  data={transactions?.data.data.transaction?.filter(
                    (type) => type.transactionType === 'Deposit'
                  )}
                  header={header}
                  type='userhistory'
                  transactionType='Deposit'
                />
              ) : (
                <TinyLoader />
              )}
            </TabPanel>
          </div>
        </div>
      </DashboardPage>
    </div>
  );
};

export default ProtectedHOC(History);
