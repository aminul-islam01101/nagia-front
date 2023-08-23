import styles from '../onboarding/onboarding.module.scss';
import mail from '@/assets/mail.svg';
import Image from 'next/image';
import Button from './Button';
import Link from 'next/link';
const ForgetPasswordModal = ({ closeModal }) => {
  return (
    <div className={styles.forgetModal}>
      <Image src={mail} alt='mail' />
      <h2>Check your mail</h2>
      <p>We have sent a password recover information to your Email</p>
      <div className={styles.btn}>
        <Button text='Open Email' />
      </div>
      <div>
        {' '}
        <a onClick={closeModal} href='#'>
          Skip
        </a>
        <span> I’ll Confirm later</span>
      </div>
    </div>
  );
};

export default ForgetPasswordModal;
