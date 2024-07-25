import React from "react";
import AuthComponent from "../components/auth";

const Register:React.FC = () => {
    return(
        <AuthComponent type="register" title="Sign Up" content="Enter your personal Detail To register" buttonName="sign up" otpState=""/>
    )
}

export default Register