import React from 'react';
import Button from '../onboarding/Button';
import { TinyLoader } from './Loader';
import styles from './misc.module.scss';

const ButtonWithLoader = ({ btnText, btnType, loading }) => {
  return (
    <div className={styles.btnwithloader}>
      <Button type={btnType} text={btnText} isLoading={loading} />
      {loading && (
        <div className={styles.loader}>
          <TinyLoader />
        </div>
      )}
    </div>
  );
};

export default ButtonWithLoader;
