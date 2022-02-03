import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

import Loading from "../components/shared/Loading";
import TableController from "../components/Table/TableController";
import ContentModal from "../components/Modals/ContentModal";
import AddPerson from "../components/SalesPeople/AddPerson";

const tableHeaders = [
  {
    label: "name",
    value: "Name",
  },
  {
    label: "lastName",
    value: "Last Name",
  },
  {
    label: "markup",
    value: "Total Markup",
  },
];

export type ValuesPersonType = {
  name: string;
  lastName: string;
  markup?: number;
  id?: string;
};

const SalesPeople = () => {
  const queryClient = useQueryClient();
  const [addItemModal, setAddItemModal] = useState<boolean>(false);

  const {
    isLoading,
    error,
    data = [],
  } = useQuery("getSellers", () =>
    fetch("http://localhost:5000/sellers").then((res) => res.json())
  );

  const mutationAddPerson = useMutation(
    (newPerson: ValuesPersonType) =>
      axios.post("http://localhost:5000/sellers", newPerson),
    {
      onSuccess: () => queryClient.invalidateQueries("getSellers"),
    }
  );

  const mutationRemovePersonById = useMutation(
    (id: string) => axios.delete(`http://localhost:5000/sellers/${id}`),
    {
      onSuccess: () => queryClient.invalidateQueries("getSellers"),
    }
  );

  const { isLoading: isLoadingMutation, isError } = mutationAddPerson;

  const { isLoading: isLoadingMutationRemove, isError: isErrorOnDelete } =
    mutationAddPerson;

  if (isLoading || isLoadingMutation || isLoadingMutationRemove)
    return <Loading />;

  if (error || isError || isErrorOnDelete)
    console.log("An error has occurred: ");

  const handleOnSubmitAddPerson = (values: ValuesPersonType) => {
    setAddItemModal(false);
    mutationAddPerson.mutate({ id: uuidv4(), ...values, markup: 0 });
  };

  const handleOnDeletePerson = (id: string) => {
    mutationRemovePersonById.mutate(id);
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
        <AddPerson onSubmit={handleOnSubmitAddPerson} />
      </ContentModal>
    </>
  );
};

export default SalesPeople;
