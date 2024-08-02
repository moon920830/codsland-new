import React, { useEffect, useState } from "react";

import {
  GetShopCart,
  HandlePurchase,
  CreatePaymentIntent,
} from "../../api/api";
import { useSnackbar } from "notistack";
import CartCard from "../../components/shop/cart-card";
import ShipRate from "../../components/shop/shiprate";

import PhoneInput from "react-phone-input-2";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";

import { Elements } from "@stripe/react-stripe-js";
import PayComponent from "./paycomponent";
import { loadStripe } from '@stripe/stripe-js';
import { payment_key } from "../../utils/config";

import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import EmailIcon from "@mui/icons-material/Email";
import OutlinedInput from "@mui/material/OutlinedInput";
import AddLocationIcon from "@mui/icons-material/AddLocation";

const steps = [
  "Check products in cart",
  "Enter you detail",
  "Select your shipment plan",
  "Approve & Finish",
];

const stripePromise = loadStripe(payment_key);

interface Product {
  _id: string;
  count: number;
  product: {
    _id: string;
    title: string;
    description: string;
    price: number;
  };
}

interface shipmentType {
  order_id: string;
}

const Cart: React.FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set<number>());
  const [products, setProducts] = useState<Product[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState<Dayjs | null>(dayjs("0000-00-00"));
  const [address, setAddress] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [shipment, setShipment] = useState<shipmentType>({ order_id: "" });
  const [clientSecret, setClientSecret] = useState(null);

  useEffect(() => {
    const GetCartProducts = async () => {
      const result = await GetShopCart(enqueueSnackbar);
      setProducts(result);
    };
    GetCartProducts();
  }, []);

  useEffect(() => {
    // Calculate total price whenever products change
    const calculateTotalPrice = () => {
      const total = products.reduce(
        (acc, product) => acc + product.product.price * product.count,
        0
      );
      setTotalPrice(total);
    };

    calculateTotalPrice();
  }, [products]);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };

  const handleStreetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStreet(e.target.value);
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

  const handleStateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState(e.target.value);
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCountry(e.target.value);
  };

  const handleZipcodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setZipcode(e.target.value);
  };

  const isStepOptional = (step: number) => {
    return step === 5;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleDate = (date: Dayjs | null): Date | null => {
    return date ? date.toDate() : null;
  };

  const handleNext = async () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    if (activeStep == 1) {
      if (email === "")
        return enqueueSnackbar("Enter Your Email", { variant: "error" });
      if (phone === "")
        return enqueueSnackbar("Enter Your Phone Number", { variant: "error" });
      if (date === null)
        return enqueueSnackbar("Enter Your Order Date", { variant: "error" });
      if (address === "")
        return enqueueSnackbar("Enter Your Address", { variant: "error" });
      if (street === "")
        return enqueueSnackbar("Enter Your Street", { variant: "error" });
      if (city === "")
        return enqueueSnackbar("Enter Your City", { variant: "error" });
      if (state === "")
        return enqueueSnackbar("Enter Your State", { variant: "error" });
      if (country === "")
        return enqueueSnackbar("Enter Your Country", { variant: "error" });
      if (zipcode === "")
        return enqueueSnackbar("Enter Your ZipCode", { variant: "error" });
      const result = await HandlePurchase(
        email,
        phone,
        handleDate(date),
        address,
        street,
        city,
        state,
        country,
        zipcode,
        enqueueSnackbar
      );
      if (result == "error") return;
      setShipment(result);
    }

    if (activeStep == 2) {
      const result = await CreatePaymentIntent(totalPrice, enqueueSnackbar);
      console.log(result)
      setClientSecret(result)
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  return (
    <div className="px-[100px] pt-[150px] pb-[50px]">
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <div className="flex mt-5">
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>Reset</Button>
          </div>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <div className="flex flex-row pt-5 mt-5 items-center">
            <div className={`text-2xl font-extrabold text-[#2E3192] mt-2 `}>
              Total Price: ${totalPrice}
            </div>
            <div className="flex ml-auto flex-row space-x-5">
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                variant="contained"
                sx={{ marginLeft: "auto" }}
              >
                Back
              </Button>
              {isStepOptional(activeStep) && (
                <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                  Skip
                </Button>
              )}
              <Button
                onClick={handleNext}
                variant="contained"
                sx={{ backgroundColor: "#2E3192" }}
              >
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </div>
          </div>
          {(() => {
            switch (activeStep) {
              case 0:
                return (
                  <div className="flex flex-col space-y-10 mt-10">
                    {products.length > 0 ? (
                      products.map((product) => (
                        <div key={product.product._id}>
                          <CartCard
                            id={product._id}
                            title={product.product.title}
                            description={product.product.description}
                            price={product.product.price}
                            count={product.count}
                            productId={product.product._id}
                            totalPrice={totalPrice}
                            setTotalPrice={setTotalPrice}
                          />
                        </div>
                      ))
                    ) : (
                      <div>No products available</div>
                    )}
                  </div>
                );
              case 1:
                return (
                  <div className="shadow-2xl bg-white py-5 px-5 mt-10 w-[600px] m-auto rounded-lg">
                    <FormControl sx={{ width: "100%" }} variant="outlined">
                      <InputLabel htmlFor="standard-adornment-password">
                        Email
                      </InputLabel>
                      <OutlinedInput
                        id="name"
                        onChange={handleEmailChange}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              sx={{ paddingRight: "0px" }}
                            >
                              <EmailIcon />
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Email"
                      />
                    </FormControl>
                    <div
                      style={{
                        width: "100%",
                        marginTop: "20px",
                      }}
                    >
                      <PhoneInput
                        country={"us"}
                        value={phone}
                        onChange={(phone) => setPhone(phone)}
                        inputStyle={{ width: "100%", height: "55px" }}
                      />
                    </div>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        sx={{ width: "100%", marginTop: "20px" }}
                        label="order date"
                        onChange={(newValue) => setDate(newValue)}
                      />
                    </LocalizationProvider>
                    <FormControl
                      sx={{ width: "100%", marginTop: "20px" }}
                      variant="outlined"
                    >
                      <InputLabel htmlFor="outlined-adornment-address">
                        Address
                      </InputLabel>
                      <OutlinedInput
                        id="address"
                        onChange={handleAddressChange}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              sx={{ paddingRight: "0px" }}
                            >
                              <AddLocationIcon />
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Address"
                      />
                    </FormControl>
                    <FormControl
                      sx={{ width: "100%", marginTop: "20px" }}
                      variant="outlined"
                    >
                      <InputLabel htmlFor="outlined-adornment-address">
                        Street
                      </InputLabel>
                      <OutlinedInput
                        id="street"
                        onChange={handleStreetChange}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              sx={{ paddingRight: "0px" }}
                            >
                              <AddLocationIcon />
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Street"
                      />
                    </FormControl>
                    <FormControl
                      sx={{ width: "100%", marginTop: "20px" }}
                      variant="outlined"
                    >
                      <InputLabel htmlFor="outlined-adornment-address">
                        City
                      </InputLabel>
                      <OutlinedInput
                        id="city"
                        onChange={handleCityChange}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              sx={{ paddingRight: "0px" }}
                            >
                              <AddLocationIcon />
                            </IconButton>
                          </InputAdornment>
                        }
                        label="City"
                      />
                    </FormControl>
                    <FormControl
                      sx={{ width: "100%", marginTop: "20px" }}
                      variant="outlined"
                    >
                      <InputLabel htmlFor="outlined-adornment-address">
                        State
                      </InputLabel>
                      <OutlinedInput
                        id="state"
                        onChange={handleStateChange}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              sx={{ paddingRight: "0px" }}
                            >
                              <AddLocationIcon />
                            </IconButton>
                          </InputAdornment>
                        }
                        label="state"
                      />
                    </FormControl>
                    <FormControl
                      sx={{ width: "100%", marginTop: "20px" }}
                      variant="outlined"
                    >
                      <InputLabel htmlFor="outlined-adornment-address">
                        Country
                      </InputLabel>
                      <OutlinedInput
                        id="country"
                        onChange={handleCountryChange}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              sx={{ paddingRight: "0px" }}
                            >
                              <AddLocationIcon />
                            </IconButton>
                          </InputAdornment>
                        }
                        label="country"
                      />
                    </FormControl>
                    <FormControl
                      sx={{ width: "100%", marginTop: "20px" }}
                      variant="outlined"
                    >
                      <InputLabel htmlFor="outlined-adornment-address">
                        Zipcode
                      </InputLabel>
                      <OutlinedInput
                        id="zipcode"
                        onChange={handleZipcodeChange}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              sx={{ paddingRight: "0px" }}
                            >
                              <AddLocationIcon />
                            </IconButton>
                          </InputAdornment>
                        }
                        label="zipcode"
                      />
                    </FormControl>
                  </div>
                );
              case 2:
                return (
                  <ShipRate
                    id={shipment.order_id}
                    setTotalPrice={setTotalPrice}
                    totalPrice={totalPrice}
                  />
                );
              case 3:
                return (
                  <div>
                    {clientSecret && (
                      <Elements
                        stripe={stripePromise}
                        options={{ clientSecret: clientSecret }}
                      >
                        <PayComponent
                          id= {shipment.order_id}
                        />
                      </Elements>
                    )}
                  </div>
                );
              default:
                return null;
            }
          })()}
        </React.Fragment>
      )}
    </div>
  );
};

export default Cart;
