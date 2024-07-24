import React from "react";
import AuthComponent from "../components/auth";

const ForgetPassword:React.FC = () => {
    return(
        <AuthComponent type="forget-password" title="Forget Password" content="Enter Your Email To Reset Password" buttonName="send" otpState=""/>
    )
}

export default ForgetPassword;