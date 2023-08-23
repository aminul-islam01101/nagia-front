import { Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import Button from '../onboarding/Button';
import * as Yup from 'yup';
import styles from './admin.module.scss';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useCreateInvestorNewsMutation } from '@/states/services/overlappingApi';

const InvestorNews = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  //REGEX FOR URL VALIDATION
  const regMatch =
    /^((http|https):\/\/)?(www.)?(?!.*(http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+(\/)?.([\w\?[a-zA-Z-_%\/@?]+)*([^\/\w\?[a-zA-Z0-9_-]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/;

  //ADD NEWS MUTATION FOM REDUX
  const [news, { data, isLoading, isSuccess, isError, error }] =
    useCreateInvestorNewsMutation();

  const handleSubmit = async (values) => {
    const imgData = new FormData();
    const img = values.file;
    imgData.append('file', img);
    imgData.append('upload_preset', 't1p6eggx');
    await axios
      .post('https://api.cloudinary.com/v1_1/odizee/image/upload/', imgData)
      .then((res) => {
        values.image = res.data.url;
      });

    news(values);
  };
  const SignupSchema = Yup.object().shape({
    title: Yup.string().required('Required!'),
    description: Yup.string().required('Required!'),
    // source: Yup.string().required("Required!"),
    // link: Yup.string()
    //   .matches(regMatch, "Link should be a valid URL")
    //   .required("Required!"),
  });
  return (
    <div className={styles.investor}>
      <h2>Investors News</h2>
      <Formik
        initialValues={{
          title: '',
          description: '',
          // link: '',
          // source: '',
          image: '',
        }}
        onSubmit={handleSubmit}
        validationSchema={SignupSchema}
      >
        {({ errors, touched, setFieldValue }) => (
          <Form>
            <div className={styles.form_group}>
              <label htmlFor='title'>Title</label>
              <Field id='title' name='title' placeholder='enter title ' />
              {errors.title && touched.title ? <div>{errors.title}</div> : null}
            </div>
            <div className={styles.form_group}>
              <label htmlFor='description'>Description</label>
              <Field
                id='description'
                name='description'
                placeholder='Write a description'
              />
              {errors.description && touched.description ? (
                <div>{errors.description}</div>
              ) : null}
            </div>
            {/* <div className={styles.form_group}>
              <label htmlFor='link'>Link</label>
              <Field id='link' name='link' placeholder='Input link to news' />
              {errors.link && touched.link ? <div>{errors.link}</div> : null}
            </div> */}
            {/* <div className={styles.form_group}>
              <label htmlFor='source'>Source</label>
              <Field id='source' name='source' placeholder='Input source' />
              {errors.source && touched.source ? (
                <div>{errors.source}</div>
              ) : null}
            </div> */}
            <div className={styles.form_group}>
              <label htmlFor='image'>Image</label>
              <input
                type='file'
                id='file'
                name='file'
                onChange={(event) => {
                  setFieldValue('file', event.currentTarget.files[0]);
                }}
              />
              {errors.file && touched.file ? <div>{errors.file}</div> : null}
            </div>

            <div className={styles.btn}>
              <Button type='submit' text='Upload Content' />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default InvestorNews;
