import React from "react";
import { Link } from "react-router-dom";
import { MdPeopleAlt } from "react-icons/md";
import { AiFillCar } from "react-icons/ai";

const ROUTES_MAP = [
  {
    label: "Sales People",
    icon: <MdPeopleAlt />,
    path: "/people",
  },
  {
    label: "Cars",
    icon: <AiFillCar />,
    path: "/cars",
  },
  {
    label: "Sales",
    icon: <AiFillCar />,
    path: "/sales",
  },
];

interface SidebarRoute {
  path: string;
  icon: React.ReactElement;
  label: string;
}

const SidebarRoute = ({ path, icon, label }: SidebarRoute) => (
  <li className="items-center">
    <Link
      className={
        "flex items-center p-3 mb-1 rounded hover:bg-gray-100 " +
        (window.location.href.indexOf(path) !== -1
          ? "text-blue-500  hover:text-blue-600 bg-gray-100"
          : "text-gray-700  hover:text-blue-500")
      }
      to={path}
    >
      {icon}
      <span className="uppercase ml-1 text-sm uppercase font-bold block">
        {label}
      </span>
    </Link>
  </li>
);

export default function Sidebar() {
  const [collapseShow, setCollapseShow] = React.useState("hidden");

  return (
    <>
      <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
          <button
            className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
            type="button"
            onClick={() => setCollapseShow("bg-white m-2 py-3 px-6")}
          >
            <i className="fas fa-bars"></i>
          </button>
          <Link
            className="md:block text-left md:pb-2 text-blue-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
            to="/"
          >
            Car 'U'
          </Link>

          <div
            className={
              "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
              collapseShow
            }
          >
            <div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-blue-200">
              <div className="flex flex-wrap">
                <div className="w-6/12">
                  <Link
                    className="md:block text-left md:pb-2 text-blue-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
                    to="/"
                  >
                    Notus React
                  </Link>
                </div>
                <div className="w-6/12 flex justify-end">
                  <button
                    type="button"
                    className="cursor-pointer text-gray opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                    onClick={() => setCollapseShow("hidden")}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </div>
            </div>
            <hr className="my-4 md:min-w-full" />
            <h6 className="md:min-w-full text-blue-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
              Admin Options
            </h6>
            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
              {ROUTES_MAP.map((route, index) => (
                <SidebarRoute key={index} {...route} />
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
