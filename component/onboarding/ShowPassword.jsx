import React from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

const ShowPassword = ({ toggle }) => {
  return (
    <div>
      {toggle ? (
        <AiFillEye size={20} cursor="pointer" />
      ) : (
        <AiFillEyeInvisible size={20} cursor="pointer" />
      )}
    </div>
  );
};

export default ShowPassword;
