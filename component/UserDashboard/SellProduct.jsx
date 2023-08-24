import { Field, Form, Formik } from 'formik';
import React, { useEffect } from 'react';
import Swal from 'sweetalert2';
import Button from '../onboarding/Button';
import * as Yup from 'yup';
import styles from './DashboardMarket/dashboardmarket.module.scss';
import {
  useGetAccountDetailsQuery,
  useSellProductMutation,
} from '@/states/services/userApi';
import { valuesIn } from 'lodash';
import { useSelector } from 'react-redux';
import { Toaster, toast } from 'react-hot-toast';
import { useRouter } from 'next/router';
import ButtonWithLoader from '../Misc/ButtonWithLoader';

const SellProduct = ({ product, close }) => {
  const router = useRouter();
  // GET USER INFORMATION
  const { user } = useSelector((state) => state.authStore);
  //BUY PRODUCT MUTATION FOM REDUX
  const [sellProduct, { data, isLoading, isSuccess, isError, error }] =
    useSellProductMutation();

  //SUBMIT FUNCTION
  const handleSubmit = async (values, { resetForm }) => {
    await sellProduct(values);
    resetForm({ values: '' });
  };

  const { data: account, isFetching: isLoadingOpp } = useGetAccountDetailsQuery(
    user?.id
  );

  useEffect(() => {
    if (error) {
      toast.error(error.data.message);
    }

    if (isSuccess) {
      Swal.fire('Thanks!', 'you will be contacted about your transaction soon!', 'success');
      close()
      // toast.success(data.message);
      // router.push(data?.transactionResult?.data.authorization_url);
      // console.log(data?.data.transactionResult.data.authorization_url);
    }
  }, [error, isSuccess, data, router]);

  //VALIDATION
  const SignupSchema = Yup.object().shape({
    quantity: Yup.string().required('Required!'),
    phoneNumber: Yup.string().required('Required!'),
  });
  return (
    <div className={styles.buyproduct}>
      <h2>Sell product</h2>
      <p>
        Kindly fill in the details to complete the selling process for your Maze
        investment.
      </p>
      <div className={styles.buyproduct__description}>
       
          <h3>Product Description</h3>
          <div className={styles.details}>
            <div className={styles.product}>
              <h4>{product.investmentOpportunity.title}</h4>
              {/* <p>+0.25%</p> */}
            </div>
       
          <div className={styles.change}>
            <a onClick={close}>Close</a>
          </div>
        </div>
      </div>
      <Formik
        initialValues={{
          investmentOpportunityId: product.investmentOpportunityId,
          amount: Number(product.purchasePrice),
          quantity: '',
          phoneNumber: '',
        }}
        onSubmit={handleSubmit}
        validationSchema={SignupSchema}
      >
        {({ errors, touched }) => (
          <Form>
            <div className={styles.form_group}>
              <label htmlFor='quantity'>Quantity</label>
              <Field
                type='number'
                id='quantity'
                name='quantity'
                placeholder='enter quantity '
              />
              {errors.quantity && touched.quantity ? (
                <div style={{color:'red', fontSize:'16px'}}>*{errors.quantity}</div>
              ) : null}
            </div>
            {/* <div className={styles.form_group}>
              <label htmlFor='bankAccount'>Phone number</label>
              <Field as='select' id='bankAccount' name='bankAccount'>
                <option value='selectbank' defaultValue='Select bank'>
                  Select bank
                </option>
                {account?.data.data.map((item) => {
                  return (
                    <option value={item.id} key={item.id}>
                      {item.bankName}
                    </option>
                  );
                })}
              </Field>
              {errors.accountDetails && touched.accountDetails ? (
                <div>{errors.accountDetails}</div>
              ) : null}
            </div> */}
               <div className={styles.form_group}>
                <label htmlFor='phoneNumber'>Phone Number </label>
                <Field
                  id='phoneNumber'
                  name='phoneNumber'
                  placeholder='Enter phone number '
                />
                {errors.phoneNumber && touched.phoneNumber ? (
                  <div style={{color:'red', fontSize:'16px'}}>*{errors.phoneNumber}</div>
                ) : null}
              </div>

            <div className={styles.btn}>
              {/* <Button type='submit' text='Sell' /> */}
              <ButtonWithLoader
                btnText={'Sell'}
                btnType={'submit'}
                loading={isLoading}
              />
            </div>
          </Form>
        )}
      </Formik>
      <Toaster />
    </div>
  );
};

export default SellProduct;
