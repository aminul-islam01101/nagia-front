import DashboardChart from '@/component/UserDashboard/DashboardHome/DashboardChart';
import DashboardProduct from '@/component/UserDashboard/DashboardHome/DashboardProduct';
import News from '@/component/UserDashboard/DashboardHome/News';
import DashboardPage from '@/component/DashboardGlobalComponents/DashboardPage';
import Link from 'next/link';
import { memo, useState } from 'react';
import styles from './dashboard.module.scss';
import { BsArrowDownLeft } from 'react-icons/bs';
import DataFilter from '@/component/Misc/DataFilter';
import ProtectedHOC from '@/component/Misc/ProtectedHOC';
import { useSelector } from 'react-redux';
import {
  useGetChartStatsQuery,
  useGetTransactionHistoryQuery,
  useGetUserInvestmentDetailsQuery,
} from '@/states/services/userApi';
import { useGetAllOpportunitiesQuery } from '@/states/services/overlappingApi';
import DashboardProductSell from '@/component/UserDashboard/DashboardHome/DashboardProductSell';

export const initialQuery = {
  page: 1,
  limit: 10,
  search: '',
};

const Dashboard = () => {
  const [query, setQuery] = useState(initialQuery);

  const { user } = useSelector((state) => state.authStore);

  const userId = user.id;
  //GET ALL OPPORTUNITIES FOM REDUX
  const { data: opportunity, isFetching: isLoadingOpp } =
    useGetAllOpportunitiesQuery(query);

  //GET ALL OPPORTUNITIES FOM REDUX
  const { data: transactionHistory, isFetching: isLoading } =
    useGetTransactionHistoryQuery(query);

  //GET ALL CHART STATS FOM REDUX
  const { data: transactionstats, isFetching: isLoadingStat } =
    useGetChartStatsQuery();

  const { data: userInvestments, isFetching: isLoadingInv } =
   

    useGetUserInvestmentDetailsQuery({
      limit: query.limit,
      page: query.page,
      userId,
    });
  const userInvestmentsResult =
    userInvestments?.data.data.userInvestment.filter(
      (userInvestments) => {
        const amountToSell = userInvestments.quantity- (userInvestments. sellRequestQuantity + userInvestments. soldQuantity)
        return userInvestments.status !== 'pending' && amountToSell > 0
      }
    );

  // console.log(result);
  return (
    <DashboardPage title='Dashboard' user={user}>
      <div className={styles.dashboard}>
        <div className={styles.top}>
          <div className={styles.top__chart}>
            <div className={styles.heading}>
              <h2>Investment Chart</h2>
              {/* <DataFilter outerBackground='#FBF8F6 ' inner='#FFFFFF' /> */}
            </div>
            <div className={styles.stats}>
              {/* <h3>NGN 2,000,000</h3> */}
              <div className={styles.stats__percent}>
                {/* <p>-0.25%</p> */}
                {/* <BsArrowDownLeft size={15} /> */}
              </div>
            </div>
            <DashboardChart chartData={transactionstats} />
          </div>
          <div className={styles.top__news}>
            <News />
          </div>
        </div>
        <div className={styles.bottom}>
          <div className={styles.bottom__gainers}>
            <div className={styles.heading}>
              <h2>Market</h2>
              <Link href='/dashboard/market'>View All</Link>
            </div>
            <div className={styles.products}>
              <DashboardProduct
                opportunity={opportunity?.data}
                btn_text='Buy Now'
                type='gainers'
              />
            </div>
          </div>
          <div className={styles.bottom__portfolio}>
            <div className={styles.heading}>
              <h2>My Portfolio</h2>
              <Link href='/dashboard/myportfolio'>View All</Link>
            </div>
            {userInvestmentsResult?.slice(0, 3).map((item) => {
              return (
                <div className={styles.products} key={item.id}>
                  <DashboardProductSell
                    opportunity={item}
                    btn_text='Sell Now'
                    type='portfolio'
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </DashboardPage>
  );
};

export default ProtectedHOC(Dashboard);
