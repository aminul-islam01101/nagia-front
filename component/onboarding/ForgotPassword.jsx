import { useEffect, useState } from 'react';
import styles from '../onboarding/onboarding.module.scss';
import { Formik, Field, Form } from 'formik';
import Button from './Button';
import Link from 'next/link';
import * as Yup from 'yup';
import ForgetPasswordModal from './ForgetPasswordModal';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { forgotpassword, reset } from '@/states/slices/authSlice';
import { useForgotPasswordMutation } from '@/states/services/authApi';
import { TinyLoader } from '../Misc/Loader';

const ForgotPassword = () => {
  // States
  const [showModal, setShowModal] = useState(false);

  // This function triggers the modals
  const triggerModal = () => {
    setShowModal(true);
  };

  const dispatch = useDispatch();
  const router = useRouter();

  //LOGIN SELECTOR FOM REDUX
  const [forgotpassword, { data, isLoading, isSuccess, isError, error }] =
    useForgotPasswordMutation();

  //FORGOT PASSWORD HANDLER
  const handleSubmit = async (values, { resetForm }) => {
    await forgotpassword(values);
    resetForm({ values: '' });
  };

  //USEEFFECT TO PERFORM ACTIONS WHEN LOGGED IN
  useEffect(() => {
    if (isError) {
      alert(error.data.data.error);
    }
    if (isSuccess) {
      setShowModal(true);
    }
  }, [
    data,
    isLoading,
    error,
    isError,
    isSuccess,
    dispatch,
    router,
    setShowModal,
  ]);

  // To validate form
  const SignupSchema = Yup.object().shape({
    email: Yup.string()
      .lowercase()
      .email('Must be a valid email!')
      .required('Required!'),
  });
  return (
    <>
      {showModal && (
        <>
          <div
            className={styles.backdrop}
            onClick={() => setShowModal(false)}
          ></div>
          <div className={styles.modal}>
            <ForgetPasswordModal closeModal={() => setShowModal(false)} />
          </div>
        </>
      )}
      <div className={`${styles.signup} ${styles.forgot}`}>
        <h1>Forgot Password</h1>
        <p>
          Enter the email associated with your account and we will send an email
          with instruction to reset your password
        </p>
        <div className={styles.form}>
          <Formik
            initialValues={{
              email: '',
            }}
            onSubmit={handleSubmit}
            validationSchema={SignupSchema}
          >
            {({ errors, touched }) => (
              <Form>
                <div className={styles.form_group}>
                  <label htmlFor='email'>Phone Number or Email</label>
                  <Field
                    id='email'
                    name='email'
                    placeholder='Enter email or  phone number '
                  />
                  {errors.email && touched.email ? (
                    <div>{errors.email}</div>
                  ) : null}
                </div>

                <div className={styles.btn}>
                  <Button text='Send Instruction' />
                  <div className={styles.loader}>
                    {isLoading && <TinyLoader />}
                  </div>
                </div>
              </Form>
            )}
          </Formik>

          <div className={styles.footer}>
            <p>
              Try{' '}
              <span>
                {' '}
                <Link href='/signin'>Signin</Link> Again
              </span>
            </p>{' '}
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
