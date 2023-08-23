import PortfolioCard from '@/component/UserDashboard/DashboardPortfolio/PortfolioCard';
import PortfolioChart from '@/component/UserDashboard/DashboardPortfolio/PortfolioChart';
import PortfolioPerfomance from '@/component/UserDashboard/DashboardPortfolio/PortfolioPerfomance';
import DashboardPage from '@/component/DashboardGlobalComponents/DashboardPage';
import styles from './dashboard.module.scss';
import { useState } from 'react';
import {
  useGetStatsQuery,
  useGetTransactionHistoryQuery,
  useGetUserInvestmentDetailsQuery,
} from '@/states/services/userApi';
import ProtectedHOC from '@/component/Misc/ProtectedHOC';
import { useSelector } from 'react-redux';

export const initialQuery = {
  page: 1,
  limit: 10,
  search: '',
};

const Myportfolio = () => {
  const [query, setQuery] = useState(initialQuery);

  const { user } = useSelector((state) => state.authStore);

  const userId = user.id;

  const { data: userInvestments, isFetching: isLoading } =
    useGetUserInvestmentDetailsQuery({
      limit: query.limit,
      page: query.page,
      userId,
    });

  const { data: stats, isFetching: isLoadingStats } = useGetStatsQuery(query);

  const userInvestmentsResult =
    userInvestments?.data.data.userInvestment.filter(
      (userInvestments) => userInvestments.status !== 'pending'
    );
  // console.log(userInvestmentsResult);

  return (
    <div>
      <DashboardPage title='My Portfolio'>
        <div className={styles.portfolio}>
          <div className={styles.cards}>
            <PortfolioCard
              title='Total Investments'
              number={stats?.data.investmentStats.totalInvestment}
              produce='produce'
            />
          </div>

          <div className={styles.portfolioperfomance}>
            {userInvestmentsResult?.map((item) => {
              return (
                <div className='' key={item.id}>
                  <PortfolioPerfomance data={item} />
                </div>
              );
            })}
          </div>
        </div>
      </DashboardPage>
    </div>
  );
};

export default ProtectedHOC(Myportfolio);
