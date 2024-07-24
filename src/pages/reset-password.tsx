import React from "react";
import AuthComponent from "../components/auth";
import { selectEmail } from "../store/selectors";
import { useSelector } from 'react-redux';

const ResetPassword:React.FC = () => {
    const email = useSelector(selectEmail);
    return(
        <AuthComponent type="reset-password" title="Password Reset" content={`We sent a code to ${email}`} buttonName="verify" otpState=""/>
    )
}

export default ResetPassword