import React from "react";
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';

const Footer: React.FC = () => {
  return (
    <>
    <div className="flex lg:flex-row flex-col px-10 sm:px-20 py-20 text-black gap-10 lg:gap-5">
      <div className="basis-6/12">
        <img src="/images/CoDS_Black_Logo.png" className="w-[260px]"/>
        <div className="text-xl sm:text-3xl font-extrabold mt-2">Church of Divine Structure Priory 175</div>
        <div className="text-sm sm:text-xl font-medium mt-2">Church of Divine Structure (CoDS) specializes in transformative holistic healing, fostering spiritual growth, and well-being through personalized, innovative practices and ancient wisdom.</div>
        <div className="flex text-xs sm:text-[16px] font-extrabold mt-5 sm:gap-5 gap-1 items-center">
          <div>Follow US</div>
          <TwitterIcon sx={{cursor: 'pointer'}}/>
          <InstagramIcon sx={{cursor: 'pointer'}}/>
          <FacebookIcon sx={{cursor: 'pointer'}}/>
          <LinkedInIcon sx={{cursor: 'pointer'}}/>
          <YouTubeIcon sx={{cursor: 'pointer'}}/>
        </div>
      </div>
      <div className="basis-6/12 grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="basis-1/4 text-[16px] font-normal">
          <div className="text-xl font-bold">More Link </div>
          <div className="mt-10 sm:mt-16"><a href="#">Bemer</a></div>
          <div className="mt-5 sm:mt-10"><a href="#">Epic</a></div>
          <div className="mt-5 sm:mt-10"><a href="#">Nature's Sunshine</a></div>
        </div>
        <div className="basis-1/4 text-[16px] font-normal">
          <div className="text-xl font-bold">Product </div>
          <div className="mt-10 sm:mt-16"><a href="#">Features</a></div>
          <div className="mt-5 sm:mt-10"><a href="#">Pricing</a></div>
          <div className="mt-5 sm:mt-10"><a href="#">Case studies</a></div>
          <div className="mt-5 sm:mt-10"><a href="#">Reviews</a></div>
          <div className="mt-5 sm:mt-10"><a href="#">Updates</a></div>
        </div>
        <div className="basis-1/4 text-[16px] font-normal">
          <div className="text-xl font-bold">Company</div>
          <div className="mt-10 sm:mt-16"><a href="#">About</a></div>
          <div className="mt-5 sm:mt-10"><a href="#">Contact Us</a></div>
          <div className="mt-5 sm:mt-10"><a href="#">Newsletters</a></div>
        </div>
        <div className="basis-1/4 text-[16px] font-normal">
          <div className="text-xl font-bold">Support</div>
          <div className="mt-10 sm:mt-16"><a href="#">Getting Started</a></div>
          <div className="mt-5 sm:mt-10"><a href="#">Help Center</a></div>
          <div className="mt-5 sm:mt-10"><a href="#">Server Status</a></div>
          <div className="mt-5 sm:mt-10"><a href="#">Report a bug</a></div>
        </div>
      </div>
    </div>
    <div className="sm:mt-10 text-center text-[14px] font-light mb-5 sm:mb-10">© 2024 All Rights Reserved</div>
    </>
  );
};

export default Footer;