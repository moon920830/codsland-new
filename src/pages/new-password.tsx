import React from "react";
import AuthComponent from "../components/auth";
import { useSelector } from "react-redux";
import { selectOtp } from "../store/selectors";

const NewPassword:React.FC = () => {
    const otp = useSelector(selectOtp)
    return(
        <AuthComponent type="new-password" title="Set New Password" content="Save at Least 8 Character" buttonName="save & continue" otpState={otp}/>
    )
}

export default NewPassword;