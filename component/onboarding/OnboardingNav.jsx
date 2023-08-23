import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "../../assets/logo.svg";
import hamburgermenu from "../../assets/hamburgermenu.svg";
import styles from "../onboarding/onboarding.module.scss";
import { AiOutlineClose } from "react-icons/ai";

const OnboardingNav = () => {
  const [showNav, setShowNav] = useState(false);

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
          <Link href="about">
            <li>About</li>
          </Link>
          <Link href="products">
            <li>Products</li>
          </Link>
          <Link href="services">
            <li>Services</li>
          </Link>
          <Link href="contact">
            <li>Contact</li>
          </Link>
        </ul>
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
          <ul>
            <Link href="/">
              <li>Home</li>
            </Link>
            <Link href="about">
              <li>About</li>
            </Link>
            <Link href="products">
              <li>Products</li>
            </Link>
            <Link href="services">
              <li>Services</li>
            </Link>
            <Link href="contact">
              <li>Contact</li>
            </Link>
          </ul>

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

export default OnboardingNav;
