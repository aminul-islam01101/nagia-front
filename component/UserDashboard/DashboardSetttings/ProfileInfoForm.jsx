import { useEffect, useState } from 'react';
import styles from './dashboardsettings.module.scss';
import { Formik, Field, Form } from 'formik';
import Link from 'next/link';
import * as Yup from 'yup';
import { ButtonFill, ButtonsOutline } from '@/component/Misc/Buttons';
import { useUpdateUserInfoMutation } from '@/states/services/userApi';
import { useSelector } from 'react-redux';
import ButtonWithLoader from '@/component/Misc/ButtonWithLoader';
import { Toaster, toast } from 'react-hot-toast';

const ProfileInfoForm = () => {
  //ADD NEWS MUTATION FOM REDUX
  const [updateUserInfo, { data, isLoading, isSuccess, isError, error }] =
    useUpdateUserInfoMutation();

  // GET USER
  const { user } = useSelector((state) => state.authStore);

  //SEND MAIL HANDLER
  const handleSubmit = async (values, { resetForm }) => {
    await updateUserInfo(values);
    resetForm({ values: '' });
  };

  useEffect(() => {
    if (error) {
      toast.error(error.data.message);
    }

    if (isSuccess) {
      toast.success(data.message);
    }
  }, [error, isSuccess, data?.message]);

  const ProfileSchema = Yup.object().shape({
    username: Yup.string().min(2, 'Too Short!').required('Required'),
    fullname: Yup.string().min(2, 'Too Short!').required('Required'),
  });
  return (
    <div className={styles.profileinfo}>
      <div className={styles.form}>
        <Formik
          initialValues={{
            fullname: user?.profile?.fullname,
            username: user.username,
          }}
          enableReinitialize
          onSubmit={handleSubmit}
          validationSchema={ProfileSchema}
        >
          {({ errors, touched }) => (
            <Form>
              <div className={styles.form_group}>
                <label htmlFor='fullname'> Full Name</label>
                <Field id='fullname' name='fullname' placeholder='Name' />
                {errors.fullname && touched.fullname ? (
                  <div>{errors.fullname}</div>
                ) : null}
              </div>
              <div className={styles.form_group}>
                <label htmlFor='username'> User Name</label>
                <Field id='username' name='username' placeholder='Username' />
                {errors.username && touched.username ? (
                  <div>{errors.username}</div>
                ) : null}
              </div>

              <div className={styles.btn}>
                {/* <ButtonsOutline type="button" text="Cancel" /> */}
                <ButtonWithLoader
                  btnText={'Update'}
                  btnType={'submit'}
                  loading={isLoading}
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <Toaster />
    </div>
  );
};

export default ProfileInfoForm;
