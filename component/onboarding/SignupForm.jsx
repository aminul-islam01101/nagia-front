import React, { useEffect, useState } from 'react';
import styles from '../onboarding/onboarding.module.scss';
import { Formik, Field, Form, useFormik, ErrorMessage } from 'formik';
import Button from './Button';
import Link from 'next/link';
import * as Yup from 'yup';
import PWDRequisite from './PWDRequisite';
import ShowPassword from './ShowPassword';
import { useSignupMutation } from '@/states/slices/authApiSlice';
import { setCredentials } from '@/states/slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { signup, reset } from '@/states/slices/authSlice';
import { useSignupUserMutation } from '@/states/services/authApi';
import { setLoginUser } from '@/states/slices/auth';
import toast, { Toaster } from 'react-hot-toast';
import { TinyLoader } from '../Misc/Loader';

const SignupForm = ({ type }) => {
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

  //SIGNUP MUTATION FOM REDUX
  const [signup, { data, isLoading, isSuccess, isError, error }] =
    useSignupUserMutation();

  //SIGNUP HANDLER
  const handleSubmit = async (values) => {
    signup({ values, type });
  };

  useEffect(() => {
    if (isError) {
      toast.error(error?.data.message);
    }
    if (isSuccess) {
      toast.success(data?.message);

      router.push('signin');
      dispatch(setLoginUser(data));
    }
    // dispatch(reset());
  }, [data, isLoading, error, isError, isSuccess, dispatch, router]);

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
    username: Yup.string().min(2, 'Too Short!').required('Required'),
    email: Yup.string()
      // .lowercase()
      .email('Must be a valid email!')
      .required('Required!'),
    phoneNumber: Yup.string().required('Required!'),
    password: Yup.string().required('Required!'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Password must be the same!')
      .required('Required!'),
  });

  return (
    <div className={styles.signup}>
      <h1>Create Account</h1>
      <p>Fill in details to create free account and get started</p>
      <div className={styles.form}>
        <Formik
          initialValues={{
            email: '',
            phoneNumber: '',
            username: '',
            password: '',
            confirmPassword: '',
          }}
          onSubmit={handleSubmit}
          validationSchema={SignupSchema}
        >
          {({ errors, touched }) => (
            <Form>
              <div className={styles.form_group}>
                <label htmlFor='email'> Email</label>
                <Field id='email' name='email' placeholder='Enter email' />
                {errors.email && touched.email ? (
                  <div>{errors.email}</div>
                ) : null}
              </div>

              <div className={styles.form_group}>
                <label htmlFor='phoneNumber'>Phone Number </label>
                <Field
                  id='phoneNumber'
                  name='phoneNumber'
                  placeholder='Enter phone number '
                />
                {errors.phoneNumber && touched.phoneNumber ? (
                  <div>{errors.phoneNumber}</div>
                ) : null}
              </div>

              <div className={styles.form_group}>
                <label htmlFor='username'>Username</label>
                <Field id='username' name='username' placeholder='Write Text' />
                {errors.username && touched.username ? (
                  <div>{errors.username}</div>
                ) : null}
              </div>
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
            Already have an account?{' '}
            <span>
              {' '}
              <Link href='signin'>Signin</Link> instead
            </span>
          </p>{' '}
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default SignupForm;
