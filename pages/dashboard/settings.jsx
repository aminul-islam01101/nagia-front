import DashboardPage from '@/component/DashboardGlobalComponents/DashboardPage';
import Image from 'next/image';
import styles from './dashboard.module.scss';
import settingsbg from '@/assets/settingsbg.png';
import settingsuser from '@/assets/settingsuser.svg';
import { TabPanel, useTabs } from 'react-headless-tabs';
import { TabSelector } from '@/component/Misc/Tabselector';
import Table from '@/component/UserDashboard/DashboardHistory/Table';
import ProfileInfoForm from '@/component/UserDashboard/DashboardSetttings/ProfileInfoForm';
import PaymentDetailsCard from '@/component/UserDashboard/DashboardSetttings/PaymentDetailsCard';
import { ButtonFill } from '@/component/Misc/Buttons';
import PasswordForm from '@/component/UserDashboard/DashboardSetttings/PasswordForm';
import AddNewList from '@/component/AdminDashboard/AddNewList';
import Popup from 'reactjs-popup';
import AddAccount from '@/component/UserDashboard/DashboardSetttings/AddAccount';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetAccountDetailsQuery } from '@/states/services/userApi';
import ProtectedHOC from '@/component/Misc/ProtectedHOC';
import { Toaster, toast } from 'react-hot-toast';

const header = ['Account Name', 'Account number', 'Bank Name', 'Actions'];

const Settings = () => {
  const [selectedTab, setSelectedTab] = useTabs([
    'profile',
    'details',
    'account',
    'password',
  ]);

  const [accountMessage, setAccountMessage] = useState('');

  const { user } = useSelector((state) => state.authStore);

  const { data: account, isFetching: isLoadingOpp } = useGetAccountDetailsQuery(
    user?.id
  );
  const ref = useRef();
  const closeTooltip = () => ref.current.close();

  // console.log(accountMessage);

  useEffect(() => {
    if (accountMessage.length > 0) {
      toast(accountMessage);
    }
  }, [accountMessage, setAccountMessage]);
// console.log(account)
  return (
    <div>
      {' '}
      <DashboardPage title='Settings'>
        <div className={styles.settings}>
          <div className={styles.settings__hero}>
            <Image src={settingsbg} alt='hero' />
          </div>
          <div className={styles.settings__user}>
            <div className={styles.settings__userimage}>
              <Image src={settingsuser} alt='user' width={100} height={100} />
            </div>
            <div className={styles.settings__username}>
              <h2>{user?.profile?.fullname || 'No Name'}</h2>
              <p>@{user?.username}</p>
            </div>
          </div>
          <div className={styles.settings__main}>
            <div className={styles.settings__tabheading}>
              <nav className={styles.tabsheading}>
                <div className={styles.tabs}>
                  <TabSelector
                    isActive={selectedTab === 'profile'}
                    onClick={() => setSelectedTab('profile')}
                  >
                    Profile Information
                  </TabSelector>
                  {/* <TabSelector
                    isActive={selectedTab === "details"}
                    onClick={() => setSelectedTab("details")}
                  >
                    Payment details
                  </TabSelector> */}
                  <TabSelector
                    isActive={selectedTab === 'account'}
                    onClick={() => setSelectedTab('account')}
                  >
                    Account details
                  </TabSelector>
                  <TabSelector
                    isActive={selectedTab === 'password'}
                    onClick={() => setSelectedTab('password')}
                  >
                    Password
                  </TabSelector>
                </div>
              </nav>
              <div className={styles.tabcontent}>
                <TabPanel hidden={selectedTab !== 'profile'}>
                  {' '}
                  <ProfileInfoForm />
                </TabPanel>
                {/* <TabPanel hidden={selectedTab !== "details"}>
                  <div className={styles.paymentdetails}>
                    <div className={styles.paymentdetails__cards}>
                      <PaymentDetailsCard />
                      <PaymentDetailsCard />
                    </div>
                    <div className={styles.paymentdetails__btn}>
                      <div className={styles.btncontent}>
                        <ButtonFill text="Add New" />
                      </div>
                    </div>
                  </div>
                </TabPanel> */}
                <TabPanel hidden={selectedTab !== 'account'}>
                  {' '}
                  <Table
                    data={account?.data.data}
                    header={header}
                    type='account'
                  />
                  <div className={styles.btnnewacc}>
                    <Popup
                      ref={ref}
                      trigger={
                        <div className={styles.addnewbtn}>
                          <ButtonFill text='Add New' />
                        </div>
                      }
                      arrow={false}
                      modal
                    >
                      <AddAccount
                        close={closeTooltip}
                        setAccountMessage={setAccountMessage}
                      />
                    </Popup>
                    {/* <Toaster /> */}
                  </div>
                </TabPanel>
                <TabPanel hidden={selectedTab !== 'password'}>
                  <div className={styles.changepassword}>
                    <PasswordForm setAccountMessage={setAccountMessage} />
                  </div>
                </TabPanel>
              </div>
            </div>
          </div>
          <Toaster />
        </div>
      </DashboardPage>
    </div>
  );
};

export default ProtectedHOC(Settings);
