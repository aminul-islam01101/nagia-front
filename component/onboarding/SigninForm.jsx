import { useEffect, useState } from "react";
import styles from "../onboarding/onboarding.module.scss";
import { Formik, Field, Form } from "formik";
import Button from "./Button";
import Link from "next/link";
import * as Yup from "yup";
import ShowPassword from "./ShowPassword";
import {
  useLoginAdminMutation,
  useLoginUserMutation,
} from "@/states/services/authApi";
import { useDispatch, useSelector } from "react-redux";
import { login, reset } from "@/states/slices/authSlice";
import { useRouter } from "next/router";
import { useLoginMutation } from "@/states/slices/authApiSlice";
import { setLoginUser } from "@/states/slices/auth";
import { Toaster, toast } from "react-hot-toast";
import { TinyLoader } from "../Misc/Loader";

const SigninForm = ({ type }) => {
  const [toggleShow, setToggleShow] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  // This function shows the password when eye icon is clicked
  const toggle = () => {
    setToggleShow(!toggleShow);
  };

  const mutation =
    type === "admin" ? useLoginAdminMutation : useLoginUserMutation;
  //LOGIN SELECTOR FOM REDUX
  const [login, { data, isLoading, isSuccess, isError, error }] = mutation();

  //LOGIN HANDLER
  const handleSubmit = async (values) => {
    login(values);
  };

  //USEEFFECT TO PERFORM ACTIONS WHEN LOGGED IN
  useEffect(() => {
    if (isError) {
      toast.error(error?.data.data.error || "Error");
    }
    if (isSuccess) {
      type === "admin" ? router.push("/admin") : router.push("dashboard");
      dispatch(setLoginUser(data));
    }
    // dispatch(reset());
  }, [data, isLoading, error, isError, isSuccess, dispatch, type, router]);

  const SignupSchema = Yup.object().shape({
    email: Yup.string()
      .lowercase()
      .email("Must be a valid email!")
      .required("Required!"),
    password: Yup.string().required("Required!"),
  });
  return (
    <div className={styles.signup}>
      <h1>Sign In</h1>
      <p>Login to your account account and get started</p>
      <div className={styles.form}>
        <Formik
          initialValues={{
            lastName: "",
            email: "",
          }}
          onSubmit={handleSubmit}
          validationSchema={SignupSchema}
        >
          {({ errors, touched }) => (
            <Form>
              <div className={styles.form_group}>
                <label htmlFor="email">Phone Number or Email</label>
                <Field
                  id="email"
                  name="email"
                  placeholder="Enter email or  phone number "
                />
                {errors.email && touched.email ? (
                  <div>{errors.email}</div>
                ) : null}
              </div>

              <div className={styles.form_group}>
                <label htmlFor="password">Password</label>
                <div className={styles.passgroup}>
                  <Field
                    id="password"
                    name="password"
                    placeholder="XXXXXXXX"
                    type={toggleShow ? "text" : "password"}
                  />
                  <div className={styles.showpass} onClick={toggle}>
                    <ShowPassword toggle={toggleShow} />
                  </div>
                </div>
                {errors.password && touched.password ? (
                  <div>{errors.password}</div>
                ) : null}
              </div>
              <div className={styles.forgot}>
                <Link href="/forgotpassword">Forgot password</Link>
              </div>

              <div className={styles.btn}>
                <Button type="submit" text="Sign In" isLoading={isLoading} />
                <div className={styles.loader}>
                  {isLoading && <TinyLoader />}
                </div>
              </div>
            </Form>
          )}
        </Formik>

        <div className={styles.footer}>
          <p>
            Don’t have an account?
            <span>
              {" "}
              <Link href="signup">Create Account</Link> instead
            </span>
          </p>{" "}
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default SigninForm;
