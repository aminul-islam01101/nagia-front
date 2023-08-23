import { Field, Form, Formik } from 'formik';
import React, { useEffect } from 'react';
import Button from '../onboarding/Button';
import * as Yup from 'yup';
import styles from './contactform.module.scss';
import axios from 'axios';
import { reset } from '@/states/slices/authSlice';
import { useContactMutation } from '@/states/services/overlappingApi';
import { Toaster, toast } from 'react-hot-toast';

const ContactForm = () => {
  const [contact, { data, isLoading, isSuccess, isError, error }] =
    useContactMutation();

  const handleSubmit = async (values, { resetForm }) => {
    await contact(values);
    resetForm({ values: '' });

    // ADD TOAST
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success('Message sent');
    }
    if (isError) {
      toast.error('Something went wrong');
    }
  }, [isSuccess, isError]);

  const SignupSchema = Yup.object().shape({
    fullname: Yup.string().required('Required'),
    email: Yup.string().email('Must be a valid email!').required('Required!'),
    phoneNumber: Yup.number().required('Required!'),
    message: Yup.string().required('Required!'),
  });
  return (
    <div className={styles.form}>
      <h2>Contact Us</h2>
      <Formik
        initialValues={{
          fullname: '',
          email: '',
          phoneNumber: '',
          message: '',
        }}
        onSubmit={handleSubmit}
        validationSchema={SignupSchema}
      >
        {({ errors, touched }) => (
          <Form>
            <div className={styles.form_group}>
              <label htmlFor='fullname'>Full Name</label>
              <Field
                id='fullname'
                name='fullname'
                placeholder='Write your name '
              />
              {errors.fullname && touched.fullname ? (
                <div>{errors.fullname}</div>
              ) : null}
            </div>

            <div className={styles.form_group}>
              <label htmlFor='email'>Email</label>
              <Field id='email' name='email' placeholder='Email' />
              {errors.email && touched.email ? <div>{errors.email}</div> : null}
            </div>

            <div className={styles.form_group}>
              <label htmlFor='phoneNumber'>Phone Number</label>
              <Field
                id='phoneNumber'
                name='phoneNumber'
                placeholder='081xxxxxxxxxxx'
              />
              {errors.phoneNumber && touched.phoneNumber ? (
                <div>{errors.phoneNumber}</div>
              ) : null}
            </div>

            <div className={styles.form_group}>
              <label htmlFor='phone'>Message</label>
              <Field
                id='message'
                name='message'
                placeholder='081XXXXXXXXX'
                as='textarea'
              />
              {errors.message && touched.message ? (
                <div>{errors.message}</div>
              ) : null}
            </div>
            <div className={styles.btn}>
              <Button type='submit' text='Send Message' />
            </div>
          </Form>
        )}
      </Formik>
      <Toaster />
    </div>
  );
};

export default ContactForm;
