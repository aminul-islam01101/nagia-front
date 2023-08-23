import { Field, Form, Formik } from 'formik';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Button from './Button';
import PWDRequisite from './PWDRequisite';
import ShowPassword from './ShowPassword';
import styles from '../onboarding/onboarding.module.scss';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { useResetPasswordMutation } from '@/states/services/authApi';
import { TinyLoader } from '../Misc/Loader';
import { Toaster, toast } from 'react-hot-toast';

const ResetPassword = () => {
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

  // This function shows the password when eye icon is clicked
  const toggle = (value, set) => {
    set(!value);
  };

  const dispatch = useDispatch();
  const router = useRouter();

  const { token } = router.query;

  //SIGNUP MUTATION FOM REDUX
  const [resetPassword, { data, isLoading, isSuccess, isError, error }] =
    useResetPasswordMutation();

  //SIGNUP HANDLER
  const handleSubmit = (values) => {
    resetPassword({ values, token });
    const value = { values };
    // console.log(value.values);
  };

  useEffect(() => {
    if (isError) {
      toast.error(error?.data.message);
    }
    if (isSuccess) {
      toast.success(data?.message);
      router.push('/signin');
    }
  }, [isError, error, isSuccess, router, data?.message, data]);

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

  const passChecks = Object.entries(checks);

  const weak = passChecks[1][1];
  const medium = passChecks[0][1];
  const strong = medium && weak;

  const SignupSchema = Yup.object().shape({
    password: Yup.string().required('Required!'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Password must be the same!')
      .required('Required!'),
  });
  return (
    <div className={styles.signup}>
      <h1>Forgot Password</h1>
      <p>
        Enter the email associated with your account and we will send an email
        with instruction to reset your password
      </p>
      <div className={styles.form}>
        <Formik
          initialValues={{
            password: '',
            confirmPassword: '',
          }}
          onSubmit={handleSubmit}
          validationSchema={SignupSchema}
        >
          {({ errors, touched }) => (
            <Form>
              <div className={styles.form_group}>
                <div className={styles.password_group}>
                  <label htmlFor='password'>Password</label>
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
                    id='password'
                    name='password'
                    placeholder='XXXXXXXX'
                    type={toggleShow ? 'text' : 'password'}
                    onFocus={handleOnFocus}
                    onKeyUp={handleOnKeyUp}
                  />
                  <div
                    className={styles.showpass}
                    onClick={() => toggle(toggleShow, setToggleShow)}
                  >
                    <ShowPassword toggle={toggleShow} />
                  </div>
                </div>
                {errors.password && touched.password ? (
                  <div>{errors.password}</div>
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
              <div className={styles.form_group}>
                <label htmlFor='confirmPassword'>Confirm Password</label>
                <div className={styles.passgroup}>
                  <Field
                    id='confirmPassword'
                    name='confirmPassword'
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
                {errors.confirmPassword && touched.confirmPassword ? (
                  <div>{errors.confirmPassword}</div>
                ) : null}
              </div>
              <div className={styles.btn}>
                <Button
                  type='submit'
                  text='Create account'
                  isLoading={isLoading}
                />
                <div className={styles.loader}>
                  {isLoading && <TinyLoader />}
                </div>
              </div>
            </Form>
          )}
        </Formik>

        <div className={styles.footer}>
          <p>
            Try
            <span>
              {' '}
              <Link href='/signin'>Signin</Link> instead
            </span>
          </p>{' '}
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default ResetPassword;
