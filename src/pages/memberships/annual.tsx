import React, { useState, useEffect } from "react";
import { getCookie } from "../../utils/cookie";
import PhoneInput from "react-phone-input-2";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { payment_key } from "../../utils/config";
import { StartPayment } from "../../api/api";
import { useSnackbar } from "notistack";

import PayComponent from "./paycomponent";

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import "react-phone-input-2/lib/style.css";

const stripePromise = loadStripe(payment_key);

const Annual: React.FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [confirm, setConfirm] = useState(false);
  const [phone, setPhone] = useState("");
  
  const [clientSecret, setClientSecret] = useState(null);
  const fullname = getCookie("fullname");
  const email = getCookie("email");
  useEffect(() => {
    const fetchClientSecret = async () => {
        try {
          const secret = await StartPayment(enqueueSnackbar);
          console.log(secret)
          setClientSecret(secret);
        } catch (error) {
          console.error('Error fetching client secret:', error);
        }
      };
  
    fetchClientSecret();
  }, [enqueueSnackbar]);
  if (!clientSecret) {
    return <div>Loading...</div>; // or some loading indicator
  }
  const checkValidation = () => {
    if(phone === null || phone === undefined || phone === "")
    {
      enqueueSnackbar("Phone field required", { variant: "error" });
      return false;
    }
    if (phone.match(/12345/)) {
      enqueueSnackbar("Enter valid phone number please", { variant: "error" });
      return false;
    } else if (phone.match(/1234/)) {
      enqueueSnackbar("Enter valid phone number please", { variant: "error" });
      return false;
    }
    return true;
  }
  const handlePaymentSuccess = (result: any) => {
    setConfirm(true);
  }
  return (
    <div className="pt-[200px]">
      <div className="shadow-lg w-[380px] p-10 m-auto sm:w-[500px]">
        <div
          className="p-10 mt-[-80px] text-white text-center"
          style={{ background: "linear-gradient(60deg, #2E3192, #2E3192)" }}
        >
          <img src="/images/auth-logo.png" alt="img" className="m-auto" />
          <div className="mt-5 text-2xl font-semibold">Membership</div>
          <div className="mt-5 text-xl font-medium">
            You are about to purchase annual membership
          </div>
        </div>
        <div className="mt-5">
          <FormControl sx={{ m: 1, width: "95%" }} variant="standard">
            <InputLabel htmlFor="standard-adornment-password">
              Full Name
            </InputLabel>
            <Input
              id="fullname"
              defaultValue={fullname}
              readOnly
              endAdornment={
                <InputAdornment position="end">
                  <IconButton aria-label="toggle password visibility">
                    <PersonIcon />
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <FormControl sx={{ m: 1, width: "95%" }} variant="standard">
            <InputLabel htmlFor="standard-adornment-password">Email</InputLabel>
            <Input
              id="email"
              readOnly
              defaultValue={email}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton aria-label="toggle password visibility">
                    <EmailIcon />
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <div style={{ width: "95%", marginTop: "10px", marginLeft: "5px" }}>
            <PhoneInput
              country={"us"}
              value={phone}
              onChange={(phone) => setPhone(phone)}
              inputStyle={{ width: "100%" }}
            />
          </div>
          {clientSecret && (
            <Elements
              stripe={stripePromise}
              options={{ clientSecret: clientSecret }}
            >
              <PayComponent handlePurchase={handlePaymentSuccess} checkValidation={checkValidation} phone={phone}/>
            </Elements>
          )}
        </div>
      </div>
    </div>
  );
};

export default Annual;
