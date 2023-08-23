import OnboardingWrapper from "../component/onboarding/OnboardingWrapper";
import SigninForm from "../component/onboarding/SigninForm";

const Signin = () => {
  return (
    <div>
      {" "}
      <OnboardingWrapper>
        <SigninForm type="user" />
      </OnboardingWrapper>
    </div>
  );
};

export default Signin;
