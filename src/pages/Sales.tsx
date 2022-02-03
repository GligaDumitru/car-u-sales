import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

import Loading from "../components/shared/Loading";
import TableController from "../components/Table/TableController";
import ContentModal from "../components/Modals/ContentModal";
import AddSaleForm from "../components/Sales/AddSaleForm";
import { ValuesPersonType } from "./SalesPeople";

const tableHeaders = [
  {
    label: "carName",
    value: "Car Name",
  },
  {
    label: "sellerName",
    value: "Seller Name",
  },
  {
    label: "sellPrice",
    value: "Sale Price",
  },
  {
    label: "buyerName",
    value: "Buyer Name",
  },
  {
    label: "soldAt",
    value: "Sold At",
  },
  {
    label: "markup",
    value: "Profit",
  },
];

export type ValuesCarFormType = {
  name: string;
  color: string;
  purchaseValue: string;
  id: string;
  status?: string;
};

export type ValuesSalesType = {
  id?: string;
  buyerName: string;
  sellPrice: string;
  selectedCar: ValuesCarFormType;
  selectedBuyer: ValuesPersonType;
  markup?: number;
  soldAt?: string;
};

export type SalesType = {
  id?: string;
  buyerName: string;
  carName: string;
  carID: string;
  sellerID?: string;
  sellPrice: string;
  sellerName: string;
  markup?: number;
  soldAt?: string;
};

const SalesController = () => {
  const queryClient = useQueryClient();
  const [addItemModal, setAddItemModal] = useState<boolean>(false);

  const {
    isLoading,
    error,
    data = [],
  } = useQuery("getSales", () =>
    fetch("http://localhost:5000/sales").then((res) => res.json())
  );

  const { data: carsData = [] } = useQuery("getCars", () =>
    fetch("http://localhost:5000/cars").then((res) => res.json())
  );

  const { data: salesPeople = [] } = useQuery("getSellers", () =>
    fetch("http://localhost:5000/sellers").then((res) => res.json())
  );

  const mutationAddItem = useMutation(
    (newItem: SalesType) => axios.post("http://localhost:5000/sales", newItem),
    {
      onSuccess: () => queryClient.invalidateQueries("getSales"),
    }
  );

  const mutationRemoveItemById = useMutation(
    (id: string) => axios.delete(`http://localhost:5000/sales/${id}`),
    {
      onSuccess: () => queryClient.invalidateQueries("getSales"),
    }
  );

  const mutationPatchCarById = useMutation(
    ({ id, data }: { id: string; data: any }) =>
      axios.patch(`http://localhost:5000/cars/${id}`, data)
  );

  const mutationPatchSellersById = useMutation(
    ({ id, data }: { id: string; data: any }) =>
      axios.patch(`http://localhost:5000/sellers/${id}`, data)
  );

  const { isLoading: isLoadingMutation, isError } = mutationAddItem;

  const { isLoading: isLoadingMutationRemove, isError: isErrorOnDelete } =
    mutationAddItem;

  if (isLoading || isLoadingMutation || isLoadingMutationRemove)
    return <Loading />;

  if (error || isError || isErrorOnDelete)
    console.log("An error has occurred: ");

  const handleOnSubmit = (values: ValuesSalesType) => {
    setAddItemModal(false);
    const { buyerName, sellPrice, selectedCar, selectedBuyer } = values;

    const { name, lastName, id } = selectedBuyer;

    const markup = Number(sellPrice) - Number(selectedCar.purchaseValue);
    const soldAt = new Date().toDateString();
    mutationAddItem.mutate({
      id: uuidv4(),
      buyerName,
      sellerName: `${name} ${lastName}`,
      carName: selectedCar.name,
      carID: selectedCar.id,
      sellerID: id,
      sellPrice: sellPrice,
      markup,
      soldAt,
    });

    mutationPatchCarById.mutate({
      id: selectedCar.id,
      data: { status: "Sold" },
    });

    mutationPatchSellersById.mutate({
      id,
      data: {
        markup: selectedBuyer.markup + markup,
      },
    });
  };

  const handleOnDeletePerson = (id: string) => {
    mutationRemoveItemById.mutate(id);
  };

  const availableCars = carsData.filter(
    (car: ValuesCarFormType) => car.status !== "Sold"
  );

  return (
    <>
      <TableController
        tableHeaders={tableHeaders}
        tableRows={data}
        handleAddRow={() => setAddItemModal(true)}
        handleDeleteRow={handleOnDeletePerson}
      />
      <ContentModal
        showOptions={false}
        open={addItemModal}
        onClose={() => setAddItemModal(false)}
        onConfirm={() => setAddItemModal(false)}
      >
        <AddSaleForm
          cars={availableCars}
          people={salesPeople}
          onSubmit={handleOnSubmit}
        />
      </ContentModal>
    </>
  );
};

export default SalesController;
