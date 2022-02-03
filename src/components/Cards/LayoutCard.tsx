import React from "react";

interface IProps {
  children: React.ReactNode;
}

const LayoutCard = ({ children }: IProps) => {
  return (
    <div className="px-4 -mt-12">
      <div className="h-screen p-4 break-words bg-white w-full mb-6 shadow-lg rounded m-2">
        {children}
      </div>
    </div>
  );
};

export default LayoutCard;
