import Image from "next/image";
import styles from "./dashboard.module.scss";
import logo from "@/assets/logo.svg";
import home from "@/assets/home.svg";
import homeoutline from "@/assets/homeOutline.svg";
import history from "@/assets/history.svg";
import historyOutline from "@/assets/historyOutline.svg";
import investment from "@/assets/investment.svg";
import calculator from "@/assets/calculator.svg";
import investmentOutline from "@/assets/investmentOutline.svg";
import calculatorOutline from "@/assets/calculatorOutline.svg";
import portfolioOutline from "@/assets/portfolioOutline.svg";
import portfolio from "@/assets/portfolio.svg";
import setting from "@/assets/setting.svg";
import settingOutline from "@/assets/settingOutline.svg";
import userOutline from "@/assets/userfilled.svg";
import contentOutline from "@/assets/contentOutline.svg";
import content from "@/assets/content.svg";
import profile from "@/assets/profile.svg";
import Link from "next/link";
import { useRouter } from "next/router";
import { memo } from "react";
import UserInfo from "../Misc/UserInfo";

const Sidebar = ({ type }) => {
  const router = useRouter();

  if (type === "admin")
    return (
      <div className={styles.sidebar}>
        <Link href="/" className={styles.sidebar__logo}>
          <Image src={logo} alt="logo" />
        </Link>
        <div className={styles.sidebar__nav}>
          <ul>
            <li className={router.pathname === "/admin" ? styles.active : ""}>
              <Link href="/admin">
                <Image
                  src={router.pathname === "/admin" ? userOutline : profile}
                  alt="admin"
                />
                <p>Users </p>
              </Link>
            </li>
            <li
              className={
                router.pathname == "/admin/history" ? styles.active : ""
              }
            >
              <Link href="/admin/history">
                <Image
                  src={
                    router.pathname === "/admin/history"
                      ? history
                      : historyOutline
                  }
                  alt="history"
                />
                <p>History </p>
              </Link>
            </li>
            <li
              className={
                router.pathname == "/admin/content" ? styles.active : ""
              }
            >
              <Link href="/admin/content">
                <Image
                  src={
                    router.pathname === "/admin/content"
                      ? content
                      : contentOutline
                  }
                  alt="content"
                />
                <p>Content </p>
              </Link>
            </li>
          </ul>

          <div className={styles.userinfo}>
            <UserInfo />
          </div>
        </div>
      </div>
    );

  return (
    <div className={styles.sidebar}>
      <Link href="/" className={styles.sidebar__logo}>
        <Image src={logo} alt="logo" />
      </Link>
      <div className={styles.sidebar__nav}>
        <ul>
          <li className={router.pathname === "/dashboard" ? styles.active : ""}>
            <Link href="/dashboard">
              <Image
                src={router.pathname === "/dashboard" ? home : homeoutline}
                alt="dashboard"
              />
              <p>Dashboard </p>
            </Link>
          </li>
          <li
            className={
              router.pathname == "/dashboard/myportfolio" ? styles.active : ""
            }
          >
            <Link href="/dashboard/myportfolio">
              <Image
                src={
                  router.pathname === "/dashboard/myportfolio"
                    ? portfolio
                    : portfolioOutline
                }
                alt="myportfolio"
              />
              <p>My Portfolio </p>
            </Link>
          </li>
          <li
            className={
              router.pathname == "/dashboard/market" ? styles.active : ""
            }
          >
            <Link href="/dashboard/market">
              <Image
                src={
                  router.pathname === "/dashboard/market"
                    ? investment
                    : investmentOutline
                }
                alt="market"
              />
              <p>Market </p>
            </Link>
          </li>
          <li
            className={
              router.pathname == "/dashboard/calculator" ? styles.active : ""
            }
          >
            <Link href="/dashboard/calculator">
              <Image
                src={
                  router.pathname === "/dashboard/calculator"
                    ? calculator
                    : calculatorOutline
                }
                alt="investmentcalculator"
              />
              <p>Investment Calculator</p>
            </Link>
          </li>
          <li
            className={
              router.pathname == "/dashboard/history" ? styles.active : ""
            }
          >
            <Link href="/dashboard/history">
              <Image
                src={
                  router.pathname === "/dashboard/history"
                    ? history
                    : historyOutline
                }
                alt="history"
              />
              <p>History</p>
            </Link>
          </li>
          <li
            className={
              router.pathname == "/dashboard/settings" ? styles.active : ""
            }
          >
            <Link href="/dashboard/settings">
              <Image
                src={
                  router.pathname === "/dashboard/settings"
                    ? setting
                    : settingOutline
                }
                alt="settings"
              />
              <p>Settings</p>
            </Link>
          </li>
        </ul>

        <div className={styles.userinfo}>
          <UserInfo />
        </div>
      </div>
    </div>
  );
};

export default memo(Sidebar);
