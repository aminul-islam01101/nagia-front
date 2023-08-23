import SignupForm from "@/component/onboarding/SignupForm";
import styles from "./admin.module.scss";

const Signup = () => {
  return (
    <div className={styles.adminsignup}>
      <SignupForm type="admin" />
    </div>
  );
};

export default Signup;
