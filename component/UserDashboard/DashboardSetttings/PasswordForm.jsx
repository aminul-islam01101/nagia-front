import React, { useEffect, useState } from 'react';
import styles from './dashboardsettings.module.scss';
import { Formik, Field, Form, useFormik, ErrorMessage } from 'formik';
import Link from 'next/link';
import * as Yup from 'yup';
import Button from '@/component/onboarding/Button';
import PWDRequisite from '@/component/onboarding/PWDRequisite';
import ShowPassword from '@/component/onboarding/ShowPassword';
import { useUpdatePasswordMutation } from '@/states/services/userApi';
import { values } from 'lodash';

const PasswordForm = ({ setAccountMessage }) => {
  const [toggleShow, setToggleShow] = useState();
  const [toggleShow2, setToggleShow2] = useState();
  const [password, setPassword] = useState('');
  const [pwdRequiste, setPWDRquisite] = useState(false);
  const [checks, setChecks] = useState({
    // capsLetterCheck: false,
    // numberCheck: false,
    pwdLengthCheck: false,
    // specialCharCheck: false,
    pwdLengthCheck_special: false,
  });

  const [updatePassword, { data, isLoading, isSuccess, isError, error }] =
    useUpdatePasswordMutation();

  // This function shows the password when eye icon is clicked
  const toggle = (value, set) => {
    set(!value);
  };

  const handleOnChange = (e) => {
    setPassword(e.target.value);
  };

  const handleOnFocus = () => {
    setPWDRquisite(true);
  };

  const handleOnKeyUp = (e) => {
    const { value } = e.target;
    // const capsLetterCheck = /[A-Z]/.test(value);
    const pwdLengthCheck_special =
      /[0-9]/.test(value) || /[!@#$%^&*]/.test(value);
    const pwdLengthCheck = value.length >= 8;
    setChecks({
      // capsLetterCheck,
      pwdLengthCheck,
      pwdLengthCheck_special,
    });
  };

  const handleUpdatePassword = async (values, { resetForm }) => {
    await updatePassword(values);
    resetForm({ values: '' });
  };

  useEffect(() => {
    if (error) {
      setAccountMessage(error.data.message);
    }
    if (isSuccess) {
      setAccountMessage(data.message);
    }
  }, [error, isSuccess, setAccountMessage, data?.message]);

  const passChecks = Object.entries(checks);

  const weak = passChecks[1][1];
  const medium = passChecks[0][1];
  const strong = medium && weak;

  const SignupSchema = Yup.object().shape({});

  return (
    <div className={styles.signup}>
      <div className={styles.form}>
        <Formik
          initialValues={{
            currentPassword: '',
            newPassword: '',
          }}
          onSubmit={handleUpdatePassword}
          validationSchema={SignupSchema}
        >
          {({ errors, touched }) => (
            <Form>
              <div className={styles.form_group}>
                <label htmlFor='currentPassword'>Old Password</label>
                <div className={styles.passgroup}>
                  <Field
                    id='currentPassword'
                    name='currentPassword'
                    placeholder='XXXXXXXX'
                    type={toggleShow2 ? 'text' : 'password'}
                  />
                  <div
                    className={styles.showpass}
                    onClick={() => toggle(toggleShow2, setToggleShow2)}
                  >
                    <ShowPassword toggle={toggleShow2} />
                  </div>
                </div>
                {errors.oldPassword && touched.oldPassword ? (
                  <div>{errors.oldPassword}</div>
                ) : null}
              </div>
              <div className={styles.form_group}>
                <div className={styles.password_group}>
                  <label htmlFor='newPassword'>New Password</label>
                  <div className={styles.password_strength}>
                    {strong ? (
                      <>
                        {' '}
                        <p>Strong</p>
                        <div
                          className={`${styles.strength_indicate} ${styles.strong}`}
                        >
                          <p>&#x2022;</p> <p>&#x2022;</p> <p>&#x2022;</p>
                        </div>
                      </>
                    ) : medium ? (
                      <>
                        {' '}
                        <p>Medium</p>
                        <div
                          className={`${styles.strength_indicate} ${styles.medium}`}
                        >
                          <p>&#x2022;</p> <p>&#x2022;</p>
                        </div>
                      </>
                    ) : (
                      <>
                        {' '}
                        <p>Weak</p>
                        <div
                          className={`${styles.strength_indicate} ${styles.weak}`}
                        >
                          <p>&#x2022;</p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <div className={styles.passgroup}>
                  <Field
                    id='newPassword'
                    name='newPassword'
                    placeholder='XXXXXXXX'
                    type={toggleShow ? 'text' : 'password'}
                    onFocus={handleOnFocus}
                    onKeyUp={handleOnKeyUp}
                    helperText
                  />
                  <div
                    className={styles.showpass}
                    onClick={() => toggle(toggleShow, setToggleShow)}
                  >
                    <ShowPassword toggle={toggleShow} />
                  </div>
                </div>
                {errors.newPassword && touched.newPassword ? (
                  <div>{errors.newPassword}</div>
                ) : null}
                {pwdRequiste ? (
                  <PWDRequisite
                    pwdLengthCheck_special={
                      checks.pwdLengthCheck_special ? 'valid' : 'invalid'
                    }
                    numberFlag={checks.numberCheck ? 'valid' : 'invalid'}
                    pwdLengthFlag={checks.pwdLengthCheck ? 'valid' : 'invalid'}
                    specialCharFlag={
                      checks.specialCharCheck ? 'valid' : 'invalid'
                    }
                  />
                ) : null}
              </div>

              {/* <div className={styles.form_group}>
                <label htmlFor="otp">OTP</label>
                <div className={styles.otpgroup}>
                  <Field id="otp" name="otp" placeholder="88888" type="text" />
                  <button type="button">Send OTP</button>
                </div>
              </div> */}
              <div className={styles.btn}>
                <Button type='submit' text='Update Password' />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default PasswordForm;
