import DashboardPage from '@/component/DashboardGlobalComponents/DashboardPage';
import BuyProduct from '@/component/UserDashboard/DashboardMarket/BuyProduct';
import { useGetOpportunityQuery } from '@/states/services/userApi';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const Buyproduct = ({ data }) => {
  const [amount, setAmount] = useState();

  const router = useRouter();

  // GET USER INFORMATION
  const { user } = useSelector((state) => state.authStore);

  // console.log(router.query.id);
  const id = router.query.id;

  const { data: opportunity, isFetching: isLoading } = useGetOpportunityQuery({
    id,
  });

  // console.log(amount);

  useEffect(() => {
    if (opportunity?.data.opportunity.amount !== undefined) {
      setAmount(opportunity?.data.opportunity.amount);
      // console.log(opportunity?.data.opportunity.amount);
    }
  }, [opportunity?.data.opportunity.amount, amount]);

  return (
    <DashboardPage>
      <BuyProduct product={opportunity} pid={id} price={amount} />
    </DashboardPage>
  );
};

export default Buyproduct;
