import Image from 'next/image';
import Link from 'next/link';
import logo from '../../assets/logo.svg';
import styles from './footer.module.scss';
import { FaFacebookSquare, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { RiInstagramFill } from 'react-icons/ri';

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={`${styles.content} container`}>
        <Link href='/' className={styles.footer__logo}>
          <Image src={logo} alt='logo' />
        </Link>
        <div className={styles.footer__links}>
          <div className={styles.footer__link}>
            <h2>Quick Links</h2>
            <Link href='/about'>About</Link>
            <Link href='/contact'>Help</Link>
          </div>
          <div className={styles.footer__link}>
            <h2>Contact</h2>
            <a href='mailto:abc@example.com?subject = Feedback&body = Message'>
              {' '}
              Email
            </a>
            <a href='tel:09129253477'>09129253477</a>
            <div className={styles.social}>
              <a
                href='http://facebook.com/nagaiagrotrade'
                target='_blank'
                rel='noopener noreferrer'
              >
                <FaFacebookSquare size={25} />
              </a>
              <a
                href='https://twitter.com/nagaiagrotrade'
                target='_blank'
                rel='noopener noreferrer'
              >
                <FaTwitter size={25} />
              </a>
              <a
                href='https://www.linkedin.com/in/nagai-agrotrade-3a419a272/'
                target='_blank'
                rel='noopener noreferrer'
              >
                <FaLinkedin size={25} />
              </a>
              <a
                href='https://instagram.com/nagaiagrotrade?igshid=YmMyMTA2M2Y='
                target='_blank'
                rel='noopener noreferrer'
              >
                <RiInstagramFill size={25} />
              </a>
            </div>
          </div>
          <div className={styles.footer__link}>
            <h2>Product</h2>
            <Link href='/dashboard'>Nagai Product</Link>
          </div>
          <div className={styles.footer__link}>
            <h2>Legal</h2>
            <Link href='/termsofservice'>Terms of services</Link>
            <Link href='#'>FAQ</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
