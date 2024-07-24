import React, { useState } from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const About: React.FC = () => {
    const [state, setState] = useState(0)
    const prevSlider = () => {
        if(state != 0) {
            setState(state-1)
        }
        else setState(2)
    };
    const nextSlider = () => {
        if(state != 2) {
            setState(state+1)
        }
        else setState(0)
    }
  return (
    <div className="flex lg:flex-row flex-col px-5 sm:px-20 sm:space-x-10">
      <div className="basis-1/2">
        <img
          src="/images/book.png"
          alt="x"
          className="w-full h-full rounded-lg sm:rounded-3xl"
        />
      </div>
      <div className="basis-1/2">
          <div className="mt-20 text-[#2E3192]">
            <div className="text-sm sm:text-xl font-bold">
              Hands-On Healing, Intutive Guidance and Unusual Healing Products
            </div>
            <div className="mt-5 text-xl sm:text-[37px] font-bold">Who We Are</div>
            <div className="text-[#475569] font-medium text-sm sm:text-lg mt-10">
              Why are Rev Dr Howell and Rev Rebecca treating and healing people
              as ministers of a Church rather than working as a naturopathic
              physician and massage therapist? CODS (Church of Divine Structure
              Priory 175 Inc.), first and foremost, a healing organization. We
              have been organized as a private membership association since
              2001. We believe in healing rather than to sell you treatments as
              a form of commerce. (We hope that our Church will raise enough
              money so that we can have a healing center and not always ask for
              money for services.)
            </div>
          </div>
          <div className="flex mt-5 sm:mt-10 items-center space-x-10">
            <div className="flex space-x-3 sm:space-x-5">
                <div className={`w-3 h-3 sm:w-5 sm:h-5 rounded-full ${state == 0 ? 'bg-[#2E3192]' : 'border-[#2E3192] border'}`}></div>
                <div className={`w-3 h-3 sm:w-5 sm:h-5 rounded-full ${state == 1 ? 'bg-[#2E3192]' : 'border-[#2E3192] border'}`}></div>
                <div className={`w-3 h-3 sm:w-5 sm:h-5 rounded-full ${state == 2 ? 'bg-[#2E3192]' : 'border-[#2E3192] border'}`}></div>
            </div>
            <div className="flex items-center space-x-5">
                <ArrowBackIcon onClick={prevSlider} sx={{ width: { xs: '18px', sm: '24px' }, cursor: 'pointer', '&:hover': { color: '#2E3192' } }}/>
                <ArrowForwardIcon onClick={nextSlider} sx={{ width: { xs: '18px', sm: '24px' }, cursor: 'pointer', '&:hover': { color: '#2E3192' } }}/>
            </div>
          </div>
      </div>
    </div>
  );
};

export default About;
