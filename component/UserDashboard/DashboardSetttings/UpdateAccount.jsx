import { Field, Form, Formik } from 'formik';
import React, { useEffect } from 'react';
import Button from '../../onboarding/Button';
import * as Yup from 'yup';
import axios from 'axios';
import styles from './dashboardsettings.module.scss';
import { useUpdateAccountMutation } from '@/states/services/userApi';
import { useSelector } from 'react-redux';
import { Toaster, toast } from 'react-hot-toast';
import { toast as newToast } from 'react-toastify';
import { banklist } from '../../../utils/banklist';
import ButtonWithLoader from '@/component/Misc/ButtonWithLoader';

const UpdateAccount = ({updateData, close, setAccountMessage }) => {

    console.log(updateData)
  //ADD ACCOUNT MUTATION FOM REDUX
  const [updateAccount, { data, isLoading, isSuccess, isError, error }] =
  useUpdateAccountMutation();
  //SUBMIT FUNCTION
  const handleSubmit = async (values, { resetForm }) => {
    const allData = {
        id: updateData.id, // Assuming you have an 'id' field in 'values'
        values, // Assuming you have another set of data called 'otherData' in 'values'
      };
    await updateAccount(allData);
    resetForm({ values: '' });
    close();
  };

  useEffect(() => {
    if (error) {
    //   setAccountMessage(error.data.message);
    newToast.error(error?.data?.message)
    }
    if (isSuccess) {
    //   setAccountMessage(data.message);
    newToast.success(data?.message);
    }
  }, [error, isSuccess, setAccountMessage, data?.message]);

  //VALIDATION
  const AccountSchema = Yup.object().shape({
    accountNumber: Yup.string().required('Required'),
    accountHolderName: Yup.string().required('Required'),
  });
  return (
    <div className={styles.addacount}>
      <h2>Update Account</h2>

      <Formik
       initialValues={{
        accountNumber: updateData.accountNumber || '',
        accountHolderName: updateData.accountHolderName || '',
        bankName: updateData.bankName || 'none', // Set the default value for bankName
      }}
        onSubmit={handleSubmit}
        validationSchema={AccountSchema}
      >
        {({ errors, touched }) => (
          <Form>
            <div className={styles.form_group}>
              <label htmlFor='accountNumber'>Account Number</label>
              <Field
                type='text'
                id='accountNumber'
                name='accountNumber'
                placeholder='Account Number'
              />
              {errors.accountNumber && touched.accountNumber ? (
                <div>{errors.accountNumber}</div>
              ) : null}
            </div>
            <div className={styles.form_group}>
              <label htmlFor='accountHolderName'>Account Name</label>
              <Field
                type='text'
                id='accountHolderName'
                name='accountHolderName'
                placeholder='Account Name'
              />
              {errors.accountHolderName && touched.accountHolderName ? (
                <div>{errors.accountHolderName}</div>
              ) : null}
            </div>
            <div className={styles.form_group}>
              <label htmlFor='bankName'>Bank Name</label>
              <Field
                as='select'
                id='bankName'
                name='bankName'
                placeholder='Bank Name'
              >
                <option value='none' selected>
                  Select an Option
                </option>
                {banklist.map((bank) => {
                  return (
                    <>
                      <option value={bank.name} key={bank.id}>
                        {bank.name}
                      </option>
                    </>
                  );
                })}
              </Field>
              {errors.bankname && touched.bankname ? (
                <div>{errors.bankname}</div>
              ) : null}
            </div>

            <div className={styles.btn}>
              {/* <Button type='submit' text='Proceed' /> */}
              <ButtonWithLoader
                btnText='Proceed'
                btnType='submit'
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

export default UpdateAccount;
