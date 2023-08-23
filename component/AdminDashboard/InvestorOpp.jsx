import { Field, Form, Formik } from 'formik';
import React from 'react';
import Button from '../onboarding/Button';
import * as Yup from 'yup';
import styles from './admin.module.scss';
import axios from 'axios';
import { useCreateProductMutation } from '@/states/services/overlappingApi';

const InvestorOpp = ({ close }) => {
  //ADD NEWS MUTATION FOM REDUX
  const [product, { data, isLoading, isSuccess, isError, error }] =
    useCreateProductMutation();
  //SUBMIT FUNCTION
  const handleSubmit = async (values, { resetForm }) => {
    // const imgData = new FormData();
    // const img = values.file;
    // imgData.append('file', img);
    // imgData.append('upload_preset', 't1p6eggx');
    // await axios
    //   .post('https://api.cloudinary.com/v1_1/odizee/image/upload/', imgData)
    //   .then((res) => {
    //     values.image = res.data.url;
    //   });
    values.image ="https://img.freepik.com/free-photo/fun-3d-cartoon-illustration-indian-businessman_183364-114440.jpg?w=996&t=st=1692635541~exp=1692636141~hmac=04ac96cce07f6f712f9c5103a16a91f9b5cd0fbb33d44699b7571ccae0ce1787"
    await product(values);
    resetForm({ values: '' });
    close();
  };

  //VALIDATION
  const SignupSchema = Yup.object().shape({
    title: Yup.string().required('Required!'),
    amount: Yup.string().required('Required!'),
    // quantity: Yup.string().required('Required!'),
    // image: Yup.string().required("Required!"),
  });
  return (
    <div className={styles.investor}>
      <h2>Investment opportunites</h2>
      <Formik
        initialValues={{
          title: '',
          amount: '',
          image: '',
          oldAmount: '',
          // growthRate: "",
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
            {/* <div className={styles.form_group}>
              <label htmlFor='quantity'>Quantity</label>
              <Field
                id='quantity'
                name='quantity'
                type='number'
                placeholder='enter quantity'
              />
              {errors.quantity && touched.quantity ? (
                <div>{errors.quantity}</div>
              ) : null}
            </div> */}
            <div className={styles.form_group}>
              <label htmlFor='amount'>Amount</label>
              <Field
                id='amount'
                type='number'
                name='amount'
                placeholder='enter amount '
              />
              {errors.amount && touched.amount ? (
                <div>{errors.amount}</div>
              ) : null}
            </div>
            <div className={styles.form_group}>
              <label htmlFor='amount'>Old Amount</label>
              <Field
                id='oldAmount'
                name='oldAmount'
                type='number'
                placeholder='enter old amount '
              />
              {errors.oldAmount && touched.oldAmount ? (
                <div>{errors.oldAmount}</div>
              ) : null}
            </div>
            {/* <div className={styles.form_group}>
              <label htmlFor='growthRate'>Growth Rate</label>
              <Field
                type='number'
                id='growthRate'
                name='growthRate'
                placeholder='enter growth rate '
              />
              {errors.growthRate && touched.growthRate ? (
                <div>{errors.growthRate}</div>
              ) : null}
            </div> */}
            <div className={styles.form_group}>
              <label htmlFor='file'>Image</label>
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

export default InvestorOpp;
