import ForgetPasswordModal from "@/component/onboarding/ForgetPasswordModal";
import ForgotPassword from "@/component/onboarding/ForgotPassword";
import OnboardingWrapper from "@/component/onboarding/OnboardingWrapper";
import styles from "../styles/forgotpass.module.scss";
const Forgotpassword = () => {
  return (
    <div className={styles.forgotpass}>
      <OnboardingWrapper>
        <ForgotPassword />
      </OnboardingWrapper>
    </div>
  );
};

export default Forgotpassword;
