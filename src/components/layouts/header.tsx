import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { removeCookie } from "../../utils/cookie";
import { useAuth } from "../../context/AuthContext";
import { scroller } from 'react-scroll';
import { useSnackbar } from "notistack";

import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";

const Header: React.FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { token, setToken } = useAuth();

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    removeCookie('token');
    setToken(''); // Clear token state
    navigate("/login"); // Optionally navigate to login after logout
  };

  const handleScrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    scroller.scrollTo('contact', {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart',
    });
  };

  const handleScrollToAbout = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    scroller.scrollTo('about', {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart',
    });
  };

  const handleSchedule = () => {
    if (token === "") {
      enqueueSnackbar("Login Required", { variant: "error" });
      
    } else {
      navigate("/schedule"); // Adjusted to navigate to a schedule page if needed
    }
  };

  const handleShop = () => {
    if (token === "") {
      enqueueSnackbar("Login Required", { variant: "error" });
      
    } else {
      navigate("/shop"); // Adjusted to navigate to a schedule page if needed
    }
  }

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <div className="py-10 flex flex-col space-y-10 text-center">
        <img
          src="/images/CoDS_Black_Logo.png"
          className="w-[120px] sm:block hidden m-auto"
          alt="logo"
        />
        <Link to="/" className="hover:text-blue-700">
          Home
        </Link>
        <Link to="#" className="hover:text-blue-700" onClick={handleScrollToAbout}>
          About
        </Link>
        <Link to="#" className="hover:text-blue-700">
          Shop
        </Link>
        <Link to="#" onClick={handleSchedule} className="hover:text-blue-700">
          Schedule
        </Link>
        <Link to="#" onClick={handleScrollToContact} className="hover:text-blue-700">
          Contact
        </Link>
        <Button
          variant="contained"
          sx={{ borderRadius: "37px", backgroundColor: "#2E3192", width: '70%', margin: 'auto' }}
          onClick={token === '' ? handleLogin : handleLogout}
        >
          {token === '' ? 'Login' : 'Logout'}
        </Button>
      </div>
    </Box>
  );

  return (
    <div className="py-3 px-5 sm:px-20 flex items-center shadow-lg fixed w-full bg-white z-20">
      <img
        src="/images/CoDS_Black_Logo.png"
        className="w-[120px] sm:block hidden"
        alt="logo"
      />
      <div className="ml-auto lg:flex space-x-7 text-xl font-normal items-center hidden">
        <Link to="/" className="hover:text-blue-700">
          Home
        </Link>
        <Link to="#" className="hover:text-blue-700" onClick={handleScrollToAbout}>
          About
        </Link>
        <div onClick={handleShop} className="hover:text-blue-700 cursor-pointer">
          Shop
        </div>
        <div onClick={handleSchedule} className="hover:text-blue-700 cursor-pointer">
          Schedule
        </div>
        <Link to="#" className="hover:text-blue-700" onClick={handleScrollToContact}>
          Contact
        </Link>
        <Button
          variant="contained"
          sx={{ borderRadius: "37px", backgroundColor: "#2E3192" }}
          onClick={token === '' ? handleLogin : handleLogout}
        >
          {token === '' ? 'Login' : 'Logout'}
        </Button>
      </div>
      <div className="lg:hidden ml-auto cursor-pointer hover:text-blue-700">
        <MenuIcon onClick={toggleDrawer(true)} />
      </div>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
};

export default Header;
