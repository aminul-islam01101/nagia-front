import Button from "../component/onboarding/Button";
import OnboardingNav from "../component/onboarding/OnboardingNav";
import OnboardingWrapper from "../component/onboarding/OnboardingWrapper";
import SignupForm from "../component/onboarding/SignupForm";

const Signup = () => {
  return (
    <OnboardingWrapper>
      <SignupForm type="user" />
    </OnboardingWrapper>
  );
};

export default Signup;
