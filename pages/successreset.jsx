import OuterPage from '@/component/OuterPage';
import OnboardingWrapper from '@/component/onboarding/OnboardingWrapper';
import styles from '@/styles/successreset.module.scss';
import Image from 'next/image';
import mail from '@/assets/mail.svg';

const Successreset = () => {
  return (
    <OnboardingWrapper>
      <div className={styles.successreset}>
        <Image src={mail} alt='mail' />

        <h1>Check your mail</h1>
        <p>We have sent a link to reset password your password</p>
      </div>
    </OnboardingWrapper>
  );
};

export default Successreset;
