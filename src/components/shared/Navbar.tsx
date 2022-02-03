import React from "react";

const Navbar = () => {
  return (
    <nav className="p-6 bg-blue-100 h-32">
      <div className="container flex flex-wrap justify-between items-center mx-auto ">
        <span className="self-center text-base font-normal whitespace-nowrap dark:text-white">
          App to track sales records
        </span>
        <div className="hidden w-full md:block md:w-auto" id="mobile-menu">
          <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
            <li className="flex items-center">
              <span className="inline-block border rounded border-blue-500 mx-1 p-2 text-xs text-blue-500">
                admin
              </span>
              <span className="text-base mx-1 p-1">Gliga Dumitru</span>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
