import React from "react";
import Sidebar from "../Sidebar";
import Navbar from "../shared/Navbar";
import LayoutCard from "../Cards/LayoutCard";

interface IProps {
  children?: React.ReactNode;
}

const DashboardLayout = ({ children }: IProps): JSX.Element => {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <Navbar />
        <LayoutCard>{children}</LayoutCard>
      </div>
    </>
  );
};

export default DashboardLayout;
