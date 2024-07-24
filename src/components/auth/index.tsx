import React, { useState, ChangeEvent } from "react";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSnackbar } from "notistack";
import { SignIn, ForgetPassword, Register, ResetPassword, NewPassword } from "../../api/api";
import { useAuth } from "../../context/AuthContext";
import dayjs, { Dayjs } from "dayjs";
import validator from "validator";
import { useDispatch } from 'react-redux';
import { setOtp, setEmail } from "../../store/otpSlice";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import { Button } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import PublicIcon from "@mui/icons-material/Public";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import OtpInput from "react-otp-input";
interface AuthType {
  type: string;
  title: string;
  content: string;
  buttonName: string;
  otpState: string;
}

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const AuthComponent: React.FC<AuthType> = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = useState(false);
  const [fullname, setFullName] = useState("");
  const [email, setEmailState] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState<Dayjs | null>(dayjs("0000-00-00"));
  const [gender, setGender] = React.useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [otp, setOtpState] = useState("");
  const { setToken } = useAuth();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailState(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const handleFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFullName(e.target.value);
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCountry(e.target.value);
  };

  const handleOtpChange = (otp: string) => {
    setOtpState(otp);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setPreviewImage(file.name);
    }
  };

  const { type, title, content, buttonName, otpState } = props;
  const handleSubmit = async () => {
    if (type === "login") {
      const formData = { email, password };
      if (email === "" || email === undefined)
        return enqueueSnackbar("Email field required", { variant: "error" });
      if (password === "" || password === undefined)
        return enqueueSnackbar("Password field required", { variant: "error" });
      if (password.length < 6)
        return enqueueSnackbar("Password must be longer than 6 characters", {
          variant: "error",
        });
      const token = await SignIn(formData, enqueueSnackbar);
      if (token) {
        setToken(token);
        navigate("/");
      }
    } else if (type === "forget-password") {
      dispatch(setEmail(email));
      const result = await ForgetPassword(email, enqueueSnackbar);
      if (result == "success") {
        navigate("/reset-password");
      }
    } else if (type === "register") {
      if (!fullname)
        return enqueueSnackbar("Enter your name", {
          variant: "error",
        });
      if (!email)
        return enqueueSnackbar("Enter your email", {
          variant: "error",
        });
      if (!validator.isEmail(email))
        return enqueueSnackbar("Enter valid email", {
          variant: "error",
        });
      if (!password)
        return enqueueSnackbar("Enter your password", {
          variant: "error",
        });
      if (password.length < 6)
        return enqueueSnackbar("Password must be longer than 6 characters", {
          variant: "error",
        });
      if (gender == "")
        return enqueueSnackbar("Select your gender", {
          variant: "error",
        });
      if (!city)
        return enqueueSnackbar("Enter your city", {
          variant: "error",
        });
      if (!country)
        return enqueueSnackbar("Enter your country", {
          variant: "error",
        });
      const year = date?.year() ??1970;
      const month = Number(date?.month()) + 1 ?? 1; // Adding 1 because months are zero-indexed
      const day = date?.date() ?? 1;
      const formattedDate = `${year}-${month < 10 ? "0" : ""}${month}-${
        day < 10 ? "0" : ""
      }${day}`;
      const formData = new FormData();
      formData.append("fullname", fullname);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("city", city);
      formData.append("birthday", formattedDate);
      formData.append("country", country);
      if (selectedImage) {
        formData.append("upload", selectedImage);
      }
      Register(formData, enqueueSnackbar);
    } else if (type === "reset-password") {
      dispatch(setOtp(otp));
      const result = await ResetPassword(otp, enqueueSnackbar);
      if (result == "success") {
        navigate("/new-password");
      }
    } else if (type === "new-password") {
        console.log(otpState)
        if(password != confirmPassword)
        {
          return enqueueSnackbar("Password mismatch",{variant:"error"});
        }
        if(!password || !confirmPassword)
        {
          return enqueueSnackbar("Type password",{variant:"error"});
        }
        const result = await NewPassword(otpState, password, enqueueSnackbar);
        if(result == "success") {
            navigate("/login")
        }
    }
  };

  return (
    <div className="flex lg:flex-row flex-col">
      <div className="basis-1/2 bg-[blue] hidden lg:block">
        <img
          src="/images/auth-bg.jpg"
          className="opacity-65 w-full h-full"
          alt="img"
        />
      </div>
      <div className="lg:basis-1/2 w-full">
        <div
          className={`m-auto px-5 pb-5 shadow-2xl w-[350px] mb-10 sm:w-[500px] mt-[100px] ${
            type != "register" ? "sm:mt-[200px]" : "sm:mt-[120px]"
          }`}
        >
          <div
            className="w-full py-5 text-white"
            style={{ background: "linear-gradient(60deg, #2E3192, #2E3192)" }}
          >
            <img src="/images/auth-logo.png" className="m-auto" />
            <div className="mt-5 text-3xl font-semibold text-center">
              {title}
            </div>
            <div className="mt-5 text-xl font-medium text-center">
              {content}
            </div>
          </div>
          <div className="mt-5 text-center">
            {type === "register" && (
              <FormControl sx={{ m: 1, width: "95%" }} variant="standard">
                <InputLabel htmlFor="standard-adornment-password">
                  Full Name
                </InputLabel>
                <Input
                  id="name"
                  onChange={handleFullNameChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton aria-label="toggle password visibility">
                        <PersonIcon />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            )}
            {type !== "reset-password" && type !== "new-password" && (
              <FormControl sx={{ m: 1, width: "95%" }} variant="standard">
                <InputLabel htmlFor="standard-adornment-password">
                  Email
                </InputLabel>
                <Input
                  id="email"
                  onChange={handleEmailChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton aria-label="toggle password visibility">
                        <EmailIcon />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            )}
            {type !== "forget-password" && type !== "reset-password" && (
              <FormControl sx={{ m: 1, width: "95%" }} variant="standard">
                <InputLabel htmlFor="standard-adornment-password">
                  Password
                </InputLabel>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  onChange={handlePasswordChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            )}
            {type === "register" && (
              <div>
                <FormControl sx={{ width: "95%", marginTop: "10px" }}>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                  >
                    <FormControlLabel
                      value="female"
                      control={<Radio onChange={() => setGender("female")} />}
                      label="Female"
                    />
                    <FormControlLabel
                      value="male"
                      control={<Radio onChange={() => setGender("male")} />}
                      label="Male"
                    />
                  </RadioGroup>
                </FormControl>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    sx={{ width: "95%", marginTop: "10px" }}
                    label="pick the date"
                    onChange={(newValue) => setDate(newValue)}
                  />
                </LocalizationProvider>
                <FormControl sx={{ m: 1, width: "95%" }} variant="standard">
                  <InputLabel htmlFor="standard-adornment-password">
                    City
                  </InputLabel>
                  <Input
                    id="city"
                    onChange={handleCityChange}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton aria-label="toggle password visibility">
                          <LocationCityIcon />
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
                <FormControl sx={{ m: 1, width: "95%" }} variant="standard">
                  <InputLabel htmlFor="standard-adornment-password">
                    Country
                  </InputLabel>
                  <Input
                    id="country"
                    onChange={handleCountryChange}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton aria-label="toggle password visibility">
                          <PublicIcon />
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
                <div className="flex justify-start ml-2 mt-5">
                  <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    sx={{ borderRadius: "20px", backgroundColor: "#2E3192" }}
                    startIcon={<CloudUploadIcon />}
                  >
                    {previewImage || "Upload Img"}
                    <VisuallyHiddenInput
                      type="file"
                      onChange={handleFileChange}
                    />
                  </Button>
                </div>
              </div>
            )}
            {type === "reset-password" && (
              <div className="mt-5">
                <div className="text-xl font-bold text-left">OPT</div>
                <OtpInput
                  value={otp}
                  onChange={handleOtpChange}
                  numInputs={4}
                  renderSeparator={
                    <span
                      style={{ marginLeft: "15px", marginRight: "15px" }}
                    ></span>
                  }
                  renderInput={(props) => (
                    <input
                      {...props}
                      style={{
                        width: "100%",
                        height: "100%",
                        textAlign: "center",
                        fontSize: "18px",
                        borderRadius: "16px",
                        backgroundColor: "white",
                        paddingTop: "5px",
                        paddingBottom: "5px",
                        marginTop: "20px",
                        border: "1px solid #2E3192",
                      }}
                    />
                  )}
                />
              </div>
            )}
            {type === "new-password" && (
              <div>
                <FormControl sx={{ m: 1, width: "95%" }} variant="standard">
                  <InputLabel htmlFor="standard-adornment-password">
                    Confirm Password
                  </InputLabel>
                  <Input
                    id="confirm-password"
                    type={showPassword ? "text" : "password"}
                    onChange={handleConfirmPasswordChange}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </div>
            )}
          </div>
          <div className="mt-5 flex justify-center">
            <Button
              variant="contained"
              sx={{ borderRadius: "20px", backgroundColor: "#2E3192" }}
              size="large"
              onClick={handleSubmit}
            >
              {buttonName}
            </Button>
          </div>
          {type === "login" && (
            <div>
              <div className="mt-10 text-[#2E3192] text-sm text-center font-bold">
                <Link to="/forget-password">Forget Password?</Link>
              </div>
              <div className="mt-10 text-sm text-center font-bold">
                Don't have an Account?
                <span className="text-[#2E3192] ml-3">
                  <Link to="/register">Register Now</Link>
                </span>
              </div>
            </div>
          )}
          {type === "forget-password" && (
            <div className="mt-10 text-[#2E3192] text-sm text-center font-bold">
              <Link to="/login">Back To Login</Link>
            </div>
          )}
          {type === "reset-password" && (
            <div className="mt-10 text-sm text-center font-bold">
              Didn't Receive?
              <span className="text-[#2E3192] ml-3">
                <Link to="/login">Resend</Link>
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthComponent;
