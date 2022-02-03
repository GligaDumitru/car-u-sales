import React, { useMemo, useState } from "react";

export type SortConfigType = {
  key: string;
  direction: string;
};

const useSortData = (data: unknown[], config: SortConfigType) => {
  const [sortingConfiguration, setSortingConfiguration] = useState(config);

  const getSortedItems = useMemo(() => {
    let sortableItems = [...data];
    if (sortingConfiguration) {
      const { key, direction } = sortingConfiguration;
      sortableItems.sort((a: any, b: any) => {
        if (a[key] < b[key]) {
          return direction === "ASC" ? -1 : 1;
        }
        if (a[key] > b[key]) {
          return direction === "ASC" ? 1 : -1;
        }
        return 0;
      });
    }

    return sortableItems;
  }, [data, sortingConfiguration]);

  const startSorting = (keyArg: string) => {
    let directionValue = "ASC";

    const { key = null, direction = "ASC" } = sortingConfiguration;

    if (key === keyArg && direction === "ASC") {
      directionValue = "DES";
    }

    setSortingConfiguration({ key: keyArg, direction: directionValue });
  };

  return { data: getSortedItems, startSorting, sortingConfiguration };
};

export default useSortData;
