import OnboardingWrapper from "@/component/onboarding/OnboardingWrapper";
import ResetPassword from "@/component/onboarding/ResetPassword";
import React from "react";

const resetpassword = () => {
  return (
    <div>
      <OnboardingWrapper>
        <ResetPassword type="user" />
      </OnboardingWrapper>
    </div>
  );
};

export default resetpassword;
