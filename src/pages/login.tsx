import React from "react";
import AuthComponent from "../components/auth";

const Login:React.FC = () => {
    return (
        <AuthComponent type="login" title="Sign In" content="Enter your Detail To continue" buttonName="sign in" otpState=""/>
    )
}

export default Login;