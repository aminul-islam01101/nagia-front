import React from 'react';
import styles from '../onboarding/onboarding.module.scss';
const Button = ({ text, type, isLoading }) => {
  return (
    <button disabled={isLoading} type={type} className={styles.button}>
      {text}
    </button>
  );
};

export default Button;
