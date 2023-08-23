import { Field, Form, Formik } from 'formik';
import React, { useEffect } from 'react';
import Button from '../../onboarding/Button';
import * as Yup from 'yup';
import axios from 'axios';
import styles from './dashboardsettings.module.scss';
import { useAddAccountMutation } from '@/states/services/userApi';
import { useSelector } from 'react-redux';
import { Toaster, toast } from 'react-hot-toast';
import { banklist } from '../../../utils/banklist';
import ButtonWithLoader from '@/component/Misc/ButtonWithLoader';

const AddAccount = ({ close, setAccountMessage }) => {
  //ADD ACCOUNT MUTATION FOM REDUX
  const [addAccount, { data, isLoading, isSuccess, isError, error }] =
    useAddAccountMutation();
  //SUBMIT FUNCTION
  const handleSubmit = async (values, { resetForm }) => {
    await addAccount(values);
    resetForm({ values: '' });
    close();
  };

  useEffect(() => {
    if (error) {
      setAccountMessage(error.data.message);
    }
    if (isSuccess) {
      setAccountMessage(data.message);
    }
  }, [error, isSuccess, setAccountMessage, data?.message]);

  //VALIDATION
  const AccountSchema = Yup.object().shape({
    accountNumber: Yup.string().required('Required'),
    accountHolderName: Yup.string().required('Required'),
  });
  return (
    <div className={styles.addacount}>
      <h2>Add Account</h2>

      <Formik
        initialValues={{
          accountNumber: '',
          accountHolderName: '',
          bankName: '',
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

export default AddAccount;
