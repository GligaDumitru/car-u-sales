import React, { useState } from "react";
import { ValuesCarFormType } from "../../pages/Cars";

interface IProps {
  onSubmit: (values: ValuesCarFormType) => void;
}

const AddCar = ({ onSubmit }: IProps) => {
  const [values, setValues] = useState({
    name: "",
    color: "",
    purchaseValue: "",
  });
  const { name, color, purchaseValue } = values;

  const handleOnChange = (event: any) => {
    const { name, value } = event?.target ?? {};
    setValues({
      ...values,
      [name]: value,
    });
  };

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="px-6 pb-4 space-y-6 lg:px-8 sm:pb-6 xl:pb-8"
    >
      <h3 className="text-xl font-medium text-gray-900 dark:text-white">
        Add new car
      </h3>
      <div>
        <label
          htmlFor="name"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Name
        </label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleOnChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
          placeholder="VW Polo"
          required
        />
      </div>
      <div>
        <label
          htmlFor="lastName"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Color
        </label>
        <input
          type="text"
          name="color"
          placeholder="red"
          onChange={handleOnChange}
          value={color}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
          required
        />
      </div>
      <div>
        <label
          htmlFor="lastName"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Purchase Value
        </label>
        <input
          type="number"
          name="purchaseValue"
          placeholder="9999"
          onChange={handleOnChange}
          value={purchaseValue}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
          required
        />
      </div>
      <button
        type="submit"
        onClick={() => onSubmit(values)}
        className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Create
      </button>
    </form>
  );
};

export default AddCar;
