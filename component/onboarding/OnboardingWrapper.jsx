import styles from "../onboarding/onboarding.module.scss";
import OnboardingNav from "./OnboardingNav";

const OnboardingWrapper = ({ children }) => {
  return (
    <div className={styles.onboardingwrapper}>
      <OnboardingNav />
      <div className={styles.main_content}>
        <div className={styles.content_form}>{children}</div>
        <div className={styles.content_image}>
          <div className={styles.textbox}>
            <p>Invest easily in agriculture from the comfort of your home</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingWrapper;
