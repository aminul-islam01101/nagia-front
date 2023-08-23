import styles from "../onboarding/onboarding.module.scss";

const PWDRequisite = ({
  pwdLengthCheck_special,
  numberFlag,
  pwdLengthFlag,
  specialCharFlag,
}) => {
  return (
    <div className={styles.message}>
      <div className={styles.pass_req}>
        <div
          className={
            pwdLengthFlag === "invalid" ? styles.invalid : styles.valid
          }
        >
          &#x2022;
        </div>
        <p>Password must have 8 Characters</p>
      </div>
      <div className={styles.pass_req}>
        <div
          className={
            pwdLengthCheck_special === "invalid" ? styles.invalid : styles.valid
          }
        >
          &#x2022;
        </div>
        <p>Number or special Characters</p>
      </div>
    </div>
  );
};

export default PWDRequisite;
