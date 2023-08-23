import SigninForm from "@/component/onboarding/SigninForm";
import styles from "./admin.module.scss";

const Signin = () => {
  return (
    <div className={styles.adminlogin}>
      <SigninForm type="admin" />
    </div>
  );
};

export default Signin;
