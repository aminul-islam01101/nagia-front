import Link from 'next/link';
import styles from './admin.module.scss';
import Button from '../onboarding/Button';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { useSendMessageMutation } from '@/states/services/adminApi';
import { TinyLoader } from '../Misc/Loader';
import { useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
const SendEmail = ({ email, close }) => {
  //ADD NEWS MUTATION FOM REDUX
  const [sendMail, { data, isLoading, isSuccess, isError, error }] =
    useSendMessageMutation();

  //SEND MAIL HANDLER
  const handleSubmit = async (values, { resetForm }) => {
    await sendMail(values);
    resetForm({ values: '' });
    close();
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message);
    }
    if (isError) {
      toast.error(error.data.message);
    }
  }, [error, isError, data, isSuccess]);

  const SignupSchema = Yup.object().shape({
    content: Yup.string().required('Required!'),
    subject: Yup.string().required('Required!'),
  });
  return (
    <div className={styles.sendemail}>
      <h2>Send Email</h2>
      <Formik
        initialValues={{
          subject: '',
          content: '',
          emails: [email],
        }}
        onSubmit={handleSubmit}
        validationSchema={SignupSchema}
      >
        {({ errors, touched }) => (
          <Form>
            <div className={`${styles.form_group} ${styles.email}`}>
              <label htmlFor='email'>Email Address</label>
              <Field id='email' name='email' placeholder={email} disabled />
            </div>
            <div className={`${styles.form_group} ${styles.subject}`}>
              <label htmlFor='subject'>Subject</label>
              <Field id='subject' name='subject' placeholder='Subject' />
            </div>
            <div className={styles.form_group}>
              <label htmlFor='content'>Message</label>
              <Field
                id='content'
                name='content'
                placeholder='Write message here '
                as='textarea'
              />
              {errors.content && touched.content ? (
                <div>{errors.content}</div>
              ) : null}
            </div>

            <div className={`${styles.btn} loader_wrap`}>
              <Button type='submit' text='Signin' />
              {isLoading && (
                <div className='loader'>
                  <TinyLoader />
                </div>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SendEmail;
