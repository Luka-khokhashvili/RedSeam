import { useMemo } from "react";

type buildPagesArrayProps = {
  currentPage: number;
  totalPages: number;
};

const useBuildPagesArray = ({
  currentPage,
  totalPages,
}: buildPagesArrayProps) => {
  const pages = useMemo<(number | "...")[]>(() => {
    const arr: (number | "...")[] = [];
    const visibleSet = new Set<number>();
    for (let i = 1; i <= totalPages; i++) {
      if (
        i <= 2 ||
        i > totalPages - 2 ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        visibleSet.add(i);
      }
    }

    for (let i = 1; i <= totalPages; i++) {
      if (visibleSet.has(i)) arr.push(i);
      else if (arr[arr.length - 1] !== "...") arr.push("...");
    }

    return arr;
  }, [currentPage, totalPages]);

  return pages;
};

export default useBuildPagesArray;
