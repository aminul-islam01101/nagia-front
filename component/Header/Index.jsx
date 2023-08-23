import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "../../assets/logo.svg";
import hamburgermenu from "../../assets/hamburgermenu.svg";
import styles from "./header.module.scss";
import { AiOutlineClose } from "react-icons/ai";
import { useSelector } from "react-redux";
import { isEmpty } from "lodash";

const Header = () => {
  const [showNav, setShowNav] = useState(false);
  const { user } = useSelector((state) => state.authStore);
  const userTrue = isEmpty(user);

  useEffect(() => {
    const body = document.querySelector("body");
    body.style.overflow = showNav ? "hidden" : "auto";
  }, [showNav]);

  return (
    <header className={styles.onboardingnav}>
      <Link href="/" className={styles.logo}>
        <Image src={logo} alt="logo" />
      </Link>
      <nav className={styles.desktop_nav}>
        <ul>
          <Link href="/">
            <li>Home</li>
          </Link>
          <Link href="/about">
            <li>About</li>
          </Link>
          <Link href="/blog">
            <li>Blog</li>
          </Link>
          <Link href="/contact">
            <li>Contact</li>
          </Link>
        </ul>
        {userTrue ? (
          <div className={styles.btns}>
            <Link href="/signin">
              <button className={styles.btn1}>Sign in</button>
            </Link>
            <Link href="/signup">
              <button className={styles.btn2}>Create Account</button>
            </Link>
          </div>
        ) : (
          <Link href="/dashboard">
            <div className={styles.btns}>
              <button className={styles.btn1}>Go to Dashboard</button>
            </div>
          </Link>
        )}
      </nav>

      <div
        className={styles.hamburger}
        onClick={() => {
          setShowNav(!showNav);
        }}
      >
        <Image src={hamburgermenu} alt="hamburger" />
      </div>
      {showNav && (
        <nav className={styles.mobile_nav}>
          <div>
            <ul>
              <Link href="/">
                <li>Home</li>
              </Link>
              <Link href="/about">
                <li>About</li>
              </Link>
              <Link href="/blog">
                <li>Blog</li>
              </Link>
              <Link href="/contact">
                <li>Contact</li>
              </Link>
            </ul>
            {userTrue ? (
              <div className={styles.btns}>
                <Link href="/signin">
                  <button className={styles.btn1}>Sign in</button>
                </Link>
                <Link href="/signup">
                  <button className={styles.btn2}>Create Account</button>
                </Link>
              </div>
            ) : (
              <div className={styles.btns}>
                <Link href="/dashboard">
                  <button className={styles.btn1}>Go to Dashboard</button>
                </Link>
              </div>
            )}
          </div>

          <div
            onClick={() => {
              setShowNav(!showNav);
            }}
          >
            <AiOutlineClose size={23} />
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
