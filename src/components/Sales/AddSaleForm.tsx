import React, { useState } from "react";
import { ValuesCarFormType } from "../../pages/Cars";
import { ValuesPersonType } from "../../pages/SalesPeople";
import Select from "../shared/Select";

interface IProps {
  cars: ValuesCarFormType[];
  onSubmit: (values: any) => void;
  people: ValuesPersonType[];
}

const AddSaleForm = ({ cars, onSubmit, people }: IProps) => {
  const [values, setValues] = useState({
    buyerName: "",
    sellPrice: "",
    selectedCar: {},
    selectedBuyer: {},
    error: "",
    disableSubmit: true,
  });

  const {
    buyerName,
    sellPrice,
    selectedCar,
    selectedBuyer,
    error,
    disableSubmit,
  } = values;

  const handleOnChange = (event: any) => {
    const { name, value } = event?.target ?? {};
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleOnSelect = (field: string) => (newSelection: any) => {
    setValues({
      ...values,
      [field]: newSelection,
    });
  };

  const handleOnChangePrice = (event: any) => {
    const { purchaseValue } = selectedCar;
    const { name, value } = event?.target ?? {};

    setValues({
      ...values,
      error:
        Number(value) < Number(purchaseValue)
          ? `The price < ${Number(purchaseValue)}`
          : "",

      disableSubmit: Number(value) < Number(purchaseValue) ? true : false,
      [name]: value,
    });
  };

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="px-6 pb-4 space-y-6 lg:px-8 sm:pb-6 xl:pb-8"
    >
      <h3 className="text-xl font-medium text-gray-900 dark:text-white">
        Sale the car
      </h3>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
          Car
        </label>
        <Select
          onSelect={handleOnSelect("selectedCar")}
          selected={selectedCar}
          options={cars}
        />
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
          Seller
        </label>
        <Select
          onSelect={handleOnSelect("selectedBuyer")}
          selected={selectedBuyer}
          options={people}
        />
      </div>
      <div>
        <label
          htmlFor="lastName"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Buyer Name
        </label>
        <input
          type="text"
          name="buyerName"
          placeholder="John Doe"
          onChange={handleOnChange}
          value={buyerName}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
          required
        />
      </div>
      {selectedCar.hasOwnProperty("name") && (
        <div>
          <label
            htmlFor="lastName"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Sale Price
          </label>
          <input
            type="number"
            name="sellPrice"
            placeholder="Doe"
            onChange={handleOnChangePrice}
            value={sellPrice}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            required
          />
        </div>
      )}
      {error && <span className="inline-block text-red-500 my-2">{error}</span>}

      <button
        type="submit"
        onClick={() => onSubmit(values)}
        disabled={disableSubmit}
        className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Sell
      </button>
    </form>
  );
};

export default AddSaleForm;
