import { Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
// import Button from '../../onboarding/Button';
import * as Yup from 'yup';
import styles from './dashboardmarket.module.scss';
import {
  useBuyProductMutation,
  useCheckoutMutation,
  useGetCheckoutDetailsQuery,
} from '@/states/services/userApi';
import { valuesIn } from 'lodash';
import { useSelector } from 'react-redux';
import { Toaster, toast } from 'react-hot-toast';
import { toast as newToast } from 'react-toastify';
import { useRouter } from 'next/router';
import { reset } from '@/states/slices/authSlice';
import {MdArrowBack} from 'react-icons/md'
import ButtonWithLoader from '@/component/Misc/ButtonWithLoader';
import { useAdminBuyProductMutation } from '@/states/services/adminApi';

const BuyProduct = ({ product, price, pid, userData, handleDoubleBack, handleBack2 }) => {
  const [investmentId, setInvestmentId] = useState();
  const [amount, setAmount] = useState();
  const [newCheckout, setNewCheckout] = useState(false);
  const [storage, setStorage] = useState(false);
  const [quantity, setQuantity] = useState('');
  const [realPrice, setRealPrice] = useState(0);
  const [serviceFee, setServiceFee] = useState(0);
  const [loading, setLoading] = useState(false);
  const [reconfirm, setReconfirm] = useState(false);

  const router = useRouter();

  // GET USER INFORMATION
  const { user } = useSelector((state) => state.authStore);
  //BUY PRODUCT MUTATION FOM REDUX
  const [buyProduct, { data, isLoading, isSuccess, isError, error }] =
  useAdminBuyProductMutation();

//   const [
//     checkout,
//     {
//       data: checkoutData,
//       isLoading: isLoadingCheck,
//       isSuccess: isSuccessCheck,
//       isError: isErrorCheck,
//       error: errorCheck,
//     },
//   ] = useCheckoutMutation();

  //TO GET PREVIOUS CHECKOUT INFO
  const { data: checkoutDetails, isFetching: isLoadingCheckout } =
    useGetCheckoutDetailsQuery();
//   const [myCheckout, setMyCheckout] = useState();
  // EFFECT TO SET CHECKOUT INFO IN STATE INITIALLY
//   useEffect(() => {
//     setMyCheckout(checkoutDetails?.data.checkoutInfo[0]);
//   }, [checkoutDetails?.data.checkoutInfo]);

  // FUNCTION TO SET A CHECKOUT INFO ONSELECT
//   const handleCheckoutDetails = (id) => {
//     const result = checkoutDetails?.data.checkoutInfo.filter(
//       (item) => item.id === id
//     );
//     setMyCheckout(result[0]);
//   };

  // FUNCTION TO SET A CHECKOUT INFO ONSELECT
  const handleStorage = (value) => {
    setStorage(value);
  };

  //SUBMIT FUNCTION
  // const handleSubmit = async (values) => {
  //   setLoading(true)
  //   if (values.acceptTerms === true) {
  //     const payload = {
  //       ...values,
  //       amount: realPrice * 100,
  //       investmentOpportunityId: pid,
  //     };
  //     await checkout(payload);
  //     setMyCheckout(checkoutData);
  //   await  buyProduct(payload);
  //   }
  //   if (values.acceptTerms === false) {
  //     toast.error("please accept terms");
  //   }
  // };
//   const handleSubmit = async (values) => {
//     if (values.acceptTerms === '') {
//       toast.error('please accept terms');
//       return;
//     }
   
//     if (values.acceptTerms === true) {
//       const payload = {
//         ...values,
//         amount: realPrice * 100,
//         investmentOpportunityId: pid,
//       };
//       if (payload.amount === 0) {
      
//         newToast.error('please confirm your amount first');
//         return;
//       }
//       setLoading(true);
//       try {
//         // Attempt the checkout
//         const checkoutResult = await checkout(payload);

//         // If the checkout is successful, set myCheckout to checkoutData
//         if (checkoutResult.data.status === 'success') {
//           setMyCheckout(checkoutResult?.data?.data?.data);

//           // Now you can proceed with buyProduct
//           await buyProduct(payload);
//         } else {
//           // Handle the case where checkout was not successful
//           // You can access checkoutResult.error for more details
//           toast.error('Checkout failed: ');
//         }
//       } catch (error) {
//         // Handle any other errors that might occur during the process
//         toast.error('An error occurred during checkout: ' + error.message);
//       }
//     } else {
//       toast.error('Please accept terms');
//     }
//   };

  // SUBMIT FUNCTION WHEN USING PREV STORED CHECKOUT INFO
  const handleSubmitDefault = async (values) => {
    // if (values.acceptTerms === '') {
    //   newToast.error("please accept terms");
    //   return
    // }

    // if (!myCheckout){
    //   newToast.error("You dont have any checkout info. Please add new checkout info")
    //   return
    // }
   
      const payload = {
        ...values,
        amount: realPrice ,
        // amount: realPrice * 100,
        investmentOpportunityId: product.id,
        user:userData
      };
      if (payload.amount === 0) {
        setLoading(false);
        newToast.error('please confirm your amount first');
        return;
      }
      setLoading(true);
    
      await buyProduct(payload);
    
  };

  const handleTotalCost = (values) => {
    if (!values.quantity) {
      newToast.error('Please enter a quantity first');
      return;
    }

    setQuantity(values.quantity);

    const productAmount = product?.amount * values.quantity;
    const fee = productAmount * 0.1; // 10% service fee
    const totalCost = productAmount + fee;

    setServiceFee(fee);
    setReconfirm(true);
    newToast.success('Your amount has been confirmed');
  };

  // const totalFee =
  // if (storage === 'true') {
  //   setRealPrice(
  //     product?.data.opportunity.amount * quantity + 1500 * quantity
  //   );
  // } else {
  //   setRealPrice(product?.data.opportunity.amount * quantity);
  // }

  useEffect(() => {
    if (storage === 'true') {
      setRealPrice(
        product?.amount * quantity +
          1500 * quantity +
          serviceFee
      );
    } else {
      setRealPrice(product?.amount * quantity + serviceFee);
    }
  }, [quantity, serviceFee, storage, product?.amount]);

  // console.log(realPrice);

  // console.log(checkoutData);

  // EFFECT TO BRING TOAST, PUSH TO PAYSTACK, AND STORE IDs
  useEffect(() => {
    if (error) {
      toast.error(error.data.message);
    }

    if (isSuccess) {
      setLoading(false);
      newToast.success(data.message);
    //   localStorage.setItem('checkoutId', myCheckout?.id);
      // localStorage.setItem('userInvId', data?.data.products.id);
      // router.push('/admin');
      handleDoubleBack();
    }
    if (isError) {
      setLoading(false);
    }
  }, [error, isSuccess, isError, data, router, ]);

//   useEffect(() => {
//     if (isSuccessCheck) {
//       setMyCheckout(checkoutData?.data.data);
//     }
//   }, [myCheckout, checkoutData?.data.data, isSuccessCheck]);

  //VALIDATION FOR NEW CHECKOUT
//   const BuySchema = Yup.object().shape({
//     quantity: Yup.number().min(10).required('Required!'),
//     email: Yup.string().required('Required!'),
//     name: Yup.string().required('Required!'),
//     address: Yup.string().required('Required!'),
//     phoneNumber: Yup.number().required('Required!'),
//   });

  //VALIDATION FOR PREV STORED CHECKOUT
  const DefaultBuySchema = Yup.object().shape({
    quantity: Yup.number().min(10).required('Required!'),
  });
console.log(realPrice)


  return (
    <div className={styles.buyproduct}>
      <button className={styles.backButton}  onClick={handleBack2}><MdArrowBack/></button>
      <h2>Buy product</h2>
      <p>
        Kindly fill in the details to complete the buying process for your
        investment.
      </p>
      <div className={styles.buyproduct__description}>
        <h3>Product Description</h3>
        <div className={styles.details}>
          <div className={styles.product}>
            <h4>{product?.title}</h4>
            <p>NGN{product?.amount}</p>
          </div>

          <div className={styles.product}>
            <h4>Storage Cost</h4>
            {storage == 'true' ? (
              <p>NGN1500/bag per year</p>
            ) : (
              <p>No storage cost</p>
            )}
          </div>
        </div>
        <div className={styles.totalcost}>
          <h2>
            Total Cost{' '}
            <span>
              NGN {realPrice} (including NGN {serviceFee} service fee)
            </span>
          </h2>
        </div>
      </div>
      {/* {!newCheckout && (
        <div className={styles.form_group}>
          <label htmlFor='bankAccount'>Choose Checkout</label>
          <select onChange={(e) => handleCheckoutDetails(e.target.value)}>
            <option value='none' selected disabled hidden>
              Select checkout details to use
            </option>
            {checkoutDetails?.data.checkoutInfo.length > 0 ? (
              checkoutDetails?.data.checkoutInfo.map((item) => {
                return (
                  <option value={item.id} key={item.id}>
                    {item.address}
                  </option>
                );
              })
            ) : (
              <option>You dont have any checkout info</option>
            )}
          </select>
        </div>
      )} */}

      <div className={`${styles.form_group} ${styles.storage}`}>
        <h3>Do you want storage?</h3>
        <select onChange={(e) => handleStorage(e.target.value)}>
          <option value='none' selected disabled hidden>
            Select an Option
          </option>

          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select>
      </div>

     
        <div className={styles.checkoutdetails}>
          <Formik
            initialValues={{
              // investmentOpportunityId: pid,
              // amount: price,
              currency: 'NGN',
              quantity: '',
              paymentMethod: 'paystack',
              email: user.email,
              acceptTerms: '',
            }}
            enableReinitialize
            onSubmit={handleSubmitDefault}
            validationSchema={DefaultBuySchema}
          >
            {({ errors, touched, values }) => (
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
                    <button
                    type='button'
                    className={styles.checkcost}
                    onClick={() => handleTotalCost(values)}
                  >
                    {!reconfirm ? 'Confirm Amount' : 'Reconfirm'}
                  </button>
                </div>
                {/* <div className={styles.checkoutdetail}>
                  <p>{myCheckout?.name}</p>
                  <p>{myCheckout?.email}</p>
                  <p>{myCheckout?.address}</p>
                  <p>{myCheckout?.phoneNumber}</p>
                </div> */}

                <div
                  className={styles.checkoutdetails__btn}
                  onClick={() => setNewCheckout(true)}
                >
                  {/* <Button type='button' text='Add new checkout info' /> */}
                </div>

                {/* <div className={styles.terms}>
                  <Field type='checkbox' id='acceptTerms' name='acceptTerms' />
                  <label htmlFor='acceptTerms'>
                    Accept Terms{' '}
                    <span>
                      <a
                        href='http://nagaing.com/termsofservice'
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        Read Terms
                      </a>
                    </span>
                  </label>
                </div> */}

                <div className={styles.btn}>
                  <ButtonWithLoader
                    btnText={'Proceed to invest'}
                    btnType={'submit'}
                    loading={loading}
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

export default BuyProduct;