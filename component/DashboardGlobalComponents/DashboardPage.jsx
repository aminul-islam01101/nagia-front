import React from "react";
import Ticker from "../Ticker/Index";
import Dashnav from "./Dashnav";
import Sidebar from "./Sidebar";
import styles from "./dashboard.module.scss";

const DashboardPage = ({ children, title, type, user }) => {
  return (
    <div className={styles.userdashboardpage}>
      <div className={styles.content}>
        <div className={styles.content__sidebar}>
          <Sidebar title={title} type={type} />
        </div>
        <div className={styles.content__main}>
          <Dashnav title={title} type={type} user={user} />
          {children}
        </div>
      </div>
      <Ticker />
    </div>
  );
};

export default DashboardPage;
