import React from 'react';

interface DescriptionProps {
  description: string;
}

const Description: React.FC<DescriptionProps> = ({ description }) => {
  const maxDisplayLength = 50;
  const truncatedDescription = description.length > maxDisplayLength 
    ? `${description.substring(0, maxDisplayLength - 3)}...` 
    : description;

  return (
    <div className="text-[16px] font-medium mt-2 h-[50px] overflow-hidden">
      {truncatedDescription}
    </div>
  );
};

export default Description;
