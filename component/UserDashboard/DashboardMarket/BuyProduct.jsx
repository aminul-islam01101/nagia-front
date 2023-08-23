import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import Button from "../../onboarding/Button";
import * as Yup from "yup";
import styles from "./dashboardmarket.module.scss";
import {
  useBuyProductMutation,
  useCheckoutMutation,
  useGetCheckoutDetailsQuery,
} from "@/states/services/userApi";
import { valuesIn } from "lodash";
import { useSelector } from "react-redux";
import { Toaster, toast } from "react-hot-toast";
import { useRouter } from "next/router";
import { reset } from "@/states/slices/authSlice";

const BuyProduct = ({ product, price, pid }) => {
  const [investmentId, setInvestmentId] = useState();
  const [amount, setAmount] = useState();
  const [newCheckout, setNewCheckout] = useState(false);
  const [storage, setStorage] = useState(false);
  const [quantity, setQuantity] = useState("");
  const [realPrice, setRealPrice] = useState("");
  const [serviceFee, setServiceFee] = useState(0);

  const router = useRouter();

  // GET USER INFORMATION
  const { user } = useSelector((state) => state.authStore);
  //BUY PRODUCT MUTATION FOM REDUX
  const [buyProduct, { data, isLoading, isSuccess, isError, error }] =
    useBuyProductMutation();

  const [
    checkout,
    {
      data: checkoutData,
      isLoading: isLoadingCheck,
      isSuccess: isSuccessCheck,
      isError: isErrorCheck,
      error: errorCheck,
    },
  ] = useCheckoutMutation();

  //TO GET PREVIOUS CHECKOUT INFO
  const { data: checkoutDetails, isFetching: isLoadingCheckout } =
  

    useGetCheckoutDetailsQuery();
  const [myCheckout, setMyCheckout] = useState();
  console.log('🌼 🔥🔥 file: BuyProduct.jsx:47 🔥🔥 BuyProduct 🔥🔥 checkoutDetails🌼', checkoutDetails);

  // EFFECT TO SET CHECKOUT INFO IN STATE INITIALLY
  useEffect(() => {
    setMyCheckout(checkoutDetails?.data.checkoutInfo[0]);
  }, [checkoutDetails?.data.checkoutInfo]);

  // FUNCTION TO SET A CHECKOUT INFO ONSELECT
  const handleCheckoutDetails = (id) => {
    const result = checkoutDetails?.data.checkoutInfo.filter(
      (item) => item.id === id
    );
    setMyCheckout(result[0]);
  };

  // FUNCTION TO SET A CHECKOUT INFO ONSELECT
  const handleStorage = (value) => {
    setStorage(value);
  };

  //SUBMIT FUNCTION
  const handleSubmit = async (values) => {
    if (values.acceptTerms === true) {
      const payload = {
        ...values,
        amount: realPrice * 100,
        investmentOpportunityId: pid,
      };
      await checkout(payload);
      setMyCheckout(checkoutData);
      buyProduct(payload);
    }
    if (values.acceptTerms === false) {
      toast.error("please accept terms");
    }
  };

  // SUBMIT FUNCTION WHEN USING PREV STORED CHECKOUT INFO
  const handleSubmitDefault = async (values) => {
    if (values.acceptTerms === true) {
      const payload = {
        ...values,
        amount: realPrice * 100,
        investmentOpportunityId: pid,
      };
      buyProduct(payload);
    }
    if (values.acceptTerms === false) {
      toast.error("please accept terms");
    }
  };

  const handleTotalCost = (values) => {
    setQuantity(values.quantity);

    const productAmount = product?.data.opportunity.amount * values.quantity;
    const fee = productAmount * 0.1; // 10% service fee
    const totalCost = productAmount + fee;

    setServiceFee(fee);
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
    if (storage === "true") {
      setRealPrice(
        product?.data.opportunity.amount * quantity +
          1500 * quantity +
          serviceFee
      );
    } else {
      setRealPrice(product?.data.opportunity.amount * quantity + serviceFee);
    }
  }, [quantity, serviceFee, storage, product?.data.opportunity.amount]);

  // console.log(realPrice);

  // console.log(checkoutData);

  // EFFECT TO BRING TOAST, PUSH TO PAYSTACK, AND STORE IDs
  useEffect(() => {
    if (error) {
      toast.error(error.data.message);
    }

    if (isSuccess) {
      toast.success(data.message);
      console.log('🌼 🔥🔥 file: BuyProduct.jsx:143 🔥🔥 useEffect 🔥🔥 data🌼', data);

      localStorage.setItem("checkoutId", myCheckout?.id);
      localStorage.setItem("userInvId", data?.data.products.id);
      router.push(data?.data.transactionResult.data.authorization_url);
    }
  }, [error, isSuccess, data, router, myCheckout?.id]);

  useEffect(() => {
    if (isSuccessCheck) {
      setMyCheckout(checkoutData?.data.data);
    }
  }, [myCheckout, checkoutData?.data.data, isSuccessCheck]);

  //VALIDATION FOR NEW CHECKOUT
  const BuySchema = Yup.object().shape({
    quantity: Yup.number().min(10).required("Required!"),
    email: Yup.string().required("Required!"),
    name: Yup.string().required("Required!"),
    address: Yup.string().required("Required!"),
    phoneNumber: Yup.number().required("Required!"),
  });

  //VALIDATION FOR PREV STORED CHECKOUT
  const DefaultBuySchema = Yup.object().shape({
    quantity: Yup.number().min(10).required("Required!"),
  });

  return (
    <div className={styles.buyproduct}>
      <h2>Buy product</h2>
      <p>
        Kindly fill in the details to complete the buying process for your
        investment.
      </p>
      <div className={styles.buyproduct__description}>
        <h3>Product Description</h3>
        <div className={styles.details}>
          <div className={styles.product}>
            <h4>{product?.data.opportunity.title}</h4>
            <p>NGN{product?.data.opportunity.amount}</p>
          </div>

          <div className={styles.product}>
            <h4>Storage Cost</h4>
            {storage == "true" ? (
              <p>NGN1500/bag per year</p>
            ) : (
              <p>No storage cost</p>
            )}
          </div>
        </div>
        <div className={styles.totalcost}>
          <h2>
            Total Cost{" "}
            <span>
              NGN {realPrice} (including NGN {serviceFee} service fee)
            </span>
          </h2>
        </div>
      </div>
      {!newCheckout && (
        <div className={styles.form_group}>
          <label htmlFor="bankAccount">Choose Checkout</label>
          <select onChange={(e) => handleCheckoutDetails(e.target.value)}>
            <option value="none" selected disabled hidden>
              Select checkout details to use
            </option>
            {checkoutDetails?.data.checkoutInfo.map((item) => {
              return (
                <option value={item.id} key={item.id}>
                  {item.address}
                </option>
              );
            })}
          </select>
        </div>
      )}

      <div className={`${styles.form_group} ${styles.storage}`}>
        <h3>Do you want storage?</h3>
        <select onChange={(e) => handleStorage(e.target.value)}>
          <option value="none" selected disabled hidden>
            Select an Option
          </option>

          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select>
      </div>

      {!newCheckout ? (
        <div className={styles.checkoutdetails}>
          <Formik
            initialValues={{
              // investmentOpportunityId: pid,
              // amount: price,
              currency: "NGN",
              quantity: "",
              paymentMethod: "paystack",
              email: user.email,
              acceptTerms: "",
            }}
            enableReinitialize
            onSubmit={handleSubmitDefault}
            validationSchema={DefaultBuySchema}
          >
            {({ errors, touched, values }) => (
              <Form>
                <div className={styles.form_group}>
                  <label htmlFor="quantity">Quantity</label>
                  <Field
                    type="number"
                    id="quantity"
                    name="quantity"
                    placeholder="enter quantity "
                  />
                  <button
                    type="button"
                    className={styles.checkcost}
                    onClick={() => handleTotalCost(values)}
                  >
                    Confirm Amount
                  </button>
                  {errors.quantity && touched.quantity ? (
                    <div>{errors.quantity}</div>
                  ) : null}
                </div>
                <div className={styles.checkoutdetail}>
                  <p>{myCheckout?.name}</p>
                  <p>{myCheckout?.email}</p>
                  <p>{myCheckout?.address}</p>
                  <p>{myCheckout?.phoneNumber}</p>
                </div>

                <div
                  className={styles.checkoutdetails__btn}
                  onClick={() => setNewCheckout(true)}
                >
                  <Button type="button" text="Add new checkout info" />
                </div>

                <div className={styles.terms}>
                  <Field type="checkbox" id="acceptTerms" name="acceptTerms" />
                  <label htmlFor="acceptTerms">
                    Accept Terms{" "}
                    <span>
                      <a
                        href="http://nagaing.com/termsofservice"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Read Terms
                      </a>
                    </span>
                  </label>
                </div>

                <div className={styles.btn}>
                  <Button type="submit" text="Proceed" />
                </div>
              </Form>
            )}
          </Formik>
        </div>
      ) : (
        <Formik
          initialValues={{
            // investmentOpportunityId: pid,
            // amount: price,
            currency: "NGN",
            quantity: "",
            paymentMethod: "paystack",
            email: user.email,
            phoneNumber: "",
            name: "",
            address: "",
            acceptTerms: "",
          }}
          enableReinitialize
          onSubmit={handleSubmit}
          validationSchema={BuySchema}
        >
          {({ errors, touched, values }) => (
            <Form>
              <div className={styles.groupone}>
                <div className={styles.form_group}>
                  <label htmlFor="quantity">Quantity</label>
                  <Field
                    type="number"
                    id="quantity"
                    name="quantity"
                    placeholder="enter quantity "
                  />
                  <button
                    type="button"
                    className={styles.checkcost}
                    onClick={() => handleTotalCost(values)}
                  >
                    Check cost
                  </button>
                  {errors.quantity && touched.quantity ? (
                    <div>{errors.quantity}</div>
                  ) : null}
                </div>
                <div className={styles.form_group}>
                  <label htmlFor="name">Full Name</label>
                  <Field id="name" name="name" placeholder="enter full name " />
                  {errors.name && touched.name ? (
                    <div>{errors.name}</div>
                  ) : null}
                </div>
              </div>
              <div className={styles.groupone}>
                <div className={styles.form_group}>
                  <label htmlFor="email">Email</label>
                  <Field id="email" name="email" placeholder="enter email " />
                  {errors.email && touched.email ? (
                    <div>{errors.email}</div>
                  ) : null}
                </div>
                <div className={styles.form_group}>
                  <label htmlFor="phoneNumber">Phone Number</label>
                  <Field
                    id="phoneNumber"
                    name="phoneNumber"
                    placeholder="enter phone number"
                  />
                  {errors.phoneNumber && touched.phoneNumber ? (
                    <div>{errors.phoneNumber}</div>
                  ) : null}
                </div>
                <div className={styles.form_group}>
                  <label htmlFor="address">Address</label>
                  <Field
                    id="address"
                    name="address"
                    placeholder="enter address"
                  />
                  {errors.address && touched.address ? (
                    <div>{errors.address}</div>
                  ) : null}
                </div>
              </div>

              <div className={styles.terms}>
                <Field type="checkbox" id="acceptTerms" name="acceptTerms" />
                <label htmlFor="acceptTerms">
                  Accept Terms{" "}
                  <span>
                    <a
                      href="http://nagaing.com/termsofservice"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Read Terms
                    </a>{" "}
                    |
                  </span>
                </label>

                <div
                  className={styles.formcheckoutbtn}
                  onClick={() => setNewCheckout(false)}
                >
                  <p>Use existing checkout details</p>
                </div>
              </div>
              <div className={styles.btn}>
                <Button type="submit" text="Proceed" />
              </div>
            </Form>
          )}
        </Formik>
      )}
      <Toaster />
    </div>
  );
};

export default BuyProduct;
