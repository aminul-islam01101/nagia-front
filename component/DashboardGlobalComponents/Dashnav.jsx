import Image from "next/image";
import styles from "./dashboard.module.scss";
import user from "@/assets/user.svg";
import notification from "@/assets/notification.svg";
import search from "@/assets/search.svg";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { memo, useEffect, useState } from "react";
import logo from "@/assets/logo.svg";
import hamburgermenu from "../../assets/hamburgermenu.svg";
import UserInfo from "../Misc/UserInfo";
import Sidebar from "./Sidebar";
import Popup from "reactjs-popup";
import MobileSearch from "../Misc/MobileSearch";
import { useGetAllNotficationsQuery } from "@/states/services/userApi";
import UserDropdown from "../Misc/UserDropdown";
import Notifications from "../Misc/Notifications";
import Link from "next/link";

export const initialQuery = {
  page: 1,
  limit: 10,
  search: "",
};

const Dashnav = ({ title, type, user }) => {
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [query, setQuery] = useState(initialQuery);

  const toggleMobileNav = () => {
    setShowMobileNav(!showMobileNav);
  };

  const { data: notifications, isFetching: isLoading } =
    useGetAllNotficationsQuery(query);

  useEffect(() => {
    if (showMobileNav) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "visible";
  }, [showMobileNav]);

  return (
    <div className={styles.dashboardnav}>
      <h1>{title}</h1>
      <div
        className={`${styles.dashnavmain} ${
          type !== "admin" && styles.dashnavmainuser
        }`}
      >
        <Link href="/" className={styles.logo}>
          <Image src={logo} alt="logo" />
        </Link>
        <div className={styles.navicons}>
          {type !== "admin" && (
            <>
              {/* <div className={styles.search}>
                <input type="text" placeholder="Search" />
                <Image src={search} alt="search" />
              </div> */}
              {/* <div className={styles.search_mobile}>
                <Popup trigger={<Image src={search} alt="search" />} modal>
                  {(close) => (
                    <div>
                      <MobileSearch close={close} />
                    </div>
                  )}
                </Popup>
              </div> */}
            </>
          )}

          <div className={styles.details}>
            {type !== "admin" && (
              <Popup
                trigger={
                  <div className={styles.details__notification}>
                    <Image src={notification} alt="notification" />
                    <h3>Notification</h3>
                  </div>
                }
                position={["bottom center", "bottom right", "bottom left"]}
                closeOnDocumentClick
                keepTooltipInside={styles.tooltipBoundary}
                arrow={false}
              >
                <Notifications notifications={notifications} />
              </Popup>
            )}
            <div className={styles.details__user}>
              <UserInfo user={user} />
            </div>
            <div className={styles.hamburger} onClick={toggleMobileNav}>
              <Image src={hamburgermenu} alt="hamburger" />
            </div>
          </div>

          <div
            className={`${styles.mobilenav} ${
              showMobileNav && styles.showsidenav
            }`}
          >
            <Sidebar type={type} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Dashnav);
