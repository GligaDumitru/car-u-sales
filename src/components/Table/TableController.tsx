import React, { useState } from "react";
import useSortData, { SortConfigType } from "../../hooks/useSortData";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import ConfirmationDeleteModal from "../Modals/ConfirmationDeleteModal";

type TableHeaderType = {
  label: string;
  value: string;
  classes?: string;
};

interface IProps {
  tableHeaders: TableHeaderType[];
  tableRows: unknown[];
  handleAddRow: () => void;
  handleDeleteRow: (id: string) => void;
}

const TableHeaderItem = ({
  label,
  value,
  classes = "",
  onSort,
  sortingConfiguration: { key, direction },
}: {
  label: string;
  value: string;
  classes?: string;
  onSort: (key: string) => void;
  sortingConfiguration: SortConfigType;
}) => (
  <th
    scope="col"
    className={`py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 cursor-pointer uppercase dark:text-gray-400 ${classes}`}
    onClick={() => onSort(label)}
  >
    <div className="flex items-center">
      {value}{" "}
      <span className={`text-lg ${key !== label ? "invisible" : ""}`}>
        {direction === "ASC" ? (
          <MdOutlineKeyboardArrowUp />
        ) : (
          <MdOutlineKeyboardArrowDown />
        )}
      </span>
    </div>
  </th>
);

const TableRowItem = ({
  headers,
  row,
  onDelete,
}: {
  headers: TableHeaderType[];
  onDelete: (id: string) => void;
  row: any;
}) => (
  <tr className="border-b odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700 dark:border-gray-600">
    {headers.map(({ label }, index) => (
      <td
        key={index}
        className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {row[label]}
      </td>
    ))}
    <td className="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
      <button
        title="Delete Item"
        className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-xs p-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => onDelete(row.id)}
      >
        <i className="far fa-trash-alt"></i>
      </button>
    </td>
  </tr>
);

const TableController = (props: IProps) => {
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [currentRowSelectedId, setCurrentRowSelectedId] = useState<string>("");

  const { tableHeaders, tableRows, handleAddRow, handleDeleteRow } = props;
  const defaultConfigType = {
    key: "name",
    direction: "ASC",
  };

  const { data, startSorting, sortingConfiguration } = useSortData(
    tableRows,
    defaultConfigType
  );

  const handleCloseDeleteModal = () => setShowDeleteModal(false);

  const handleAcceptDeleteModal = () => {
    setShowDeleteModal(false);
    handleDeleteRow(currentRowSelectedId);
  };

  return (
    <>
      <button
        className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={handleAddRow}
      >
        <i className="fas fa-plus"></i> New Row
      </button>
      <ConfirmationDeleteModal
        open={showDeleteModal}
        onClose={handleCloseDeleteModal}
        onAccept={handleAcceptDeleteModal}
      />

      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block py-2 min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow-md sm:rounded">
              <table className="min-w-full">
                <thead className="bg-gray-100 dark:bg-gray-700">
                  <tr>
                    {tableHeaders.map((tHeader, index) => (
                      <TableHeaderItem
                        key={index}
                        {...tHeader}
                        onSort={startSorting}
                        sortingConfiguration={sortingConfiguration}
                      />
                    ))}
                    <th scope="col" className="relative py-3 px-6">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((row, index) => (
                    <TableRowItem
                      key={index}
                      headers={tableHeaders}
                      row={row}
                      onDelete={(id: string) => {
                        setCurrentRowSelectedId(id);
                        setShowDeleteModal(true);
                      }}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TableController;
