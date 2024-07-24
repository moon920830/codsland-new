import React, { useState } from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

interface CollapseType {
  content: string,
  leading: Number
}

const Collapse: React.FC<CollapseType> = (props) => {
  const { content, leading } = props;
  const [stats, setStats] = useState(false);
  
  const toggleStats = () => {
    setStats(!stats);
  };

  return (
    <>
      <div className={`mt-5 lg:mt-10 font-bold text-[#475569] text-sm lg:text-2xl lg:leading-[${leading}px] ${stats ? '' : 'h-[220px]'} overflow-hidden`}>
        {content}
      </div>
      <div className="text-[#475569] cursor-pointer text-center mt-2 text-sm lg:text-xl hover:text-[#2E3192] hover:font-semibold" onClick={toggleStats}>
        {stats ? (
          <>
            <div><KeyboardArrowUpIcon /></div><div className="mt-[-10px]">READ LESS </div>
          </>
        ) : (
          <>
            <div className="mb-[-10px]">READ MORE</div><div><KeyboardArrowDownIcon /> </div>
          </>
        )}
      </div>
    </>
  );
};

export default Collapse;
