import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

import Loading from "../components/shared/Loading";
import TableController from "../components/Table/TableController";
import ContentModal from "../components/Modals/ContentModal";
import AddCar from "../components/Cars/AddCar";

const tableHeaders = [
  {
    label: "name",
    value: "Name",
  },
  {
    label: "color",
    value: "Color",
  },
  {
    label: "purchaseValue",
    value: "Purchase Value",
  },
  {
    label: "status",
    value: "Status",
  },
];

export type ValuesCarFormType = {
  name: string;
  color: string;
  purchaseValue: string;
  status?: string;
  id?: string;
};

const CarsController = () => {
  const queryClient = useQueryClient();
  const [addItemModal, setAddItemModal] = useState<boolean>(false);

  const {
    isLoading,
    error,
    data = [],
  } = useQuery("getCars", () =>
    fetch("http://localhost:5000/cars").then((res) => res.json())
  );

  const mutationAddItem = useMutation(
    (newItem: ValuesCarFormType) =>
      axios.post("http://localhost:5000/cars", newItem),
    {
      onSuccess: () => queryClient.invalidateQueries("getCars"),
    }
  );

  const mutationRemoveItemById = useMutation(
    (id: string) => axios.delete(`http://localhost:5000/cars/${id}`),
    {
      onSuccess: () => queryClient.invalidateQueries("getCars"),
    }
  );

  const { isLoading: isLoadingMutation, isError } = mutationAddItem;

  const { isLoading: isLoadingMutationRemove, isError: isErrorOnDelete } =
    mutationAddItem;

  if (isLoading || isLoadingMutation || isLoadingMutationRemove)
    return <Loading />;

  if (error || isError || isErrorOnDelete)
    console.log("An error has occurred: ");

  const handleOnSubmit = (values: ValuesCarFormType) => {
    setAddItemModal(false);
    mutationAddItem.mutate({ id: uuidv4(), ...values, status: "Available" });
  };

  const handleOnDeletePerson = (id: string) => {
    mutationRemoveItemById.mutate(id);
  };

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
        <AddCar onSubmit={handleOnSubmit} />
      </ContentModal>
    </>
  );
};

export default CarsController;
