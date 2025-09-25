// src/context/ListingContext.tsx
import { createContext, useContext, useEffect, useState } from "react";

interface Filters {
  priceFrom: number | undefined;
  priceTo: number | undefined;
}

interface ListingContextType {
  page: number;
  setPage: (page: number) => void;
  filters: Filters;
  setFilters: (filters: Filters) => void;
  sort: string;
  setSort: (sort: string) => void;
}

const ListingContext = createContext<ListingContextType | null>(null);

export const ListingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<Filters>({
    priceFrom: undefined,
    priceTo: undefined,
  });
  const [sort, setSort] = useState("");

  useEffect(() => {
    setPage(1);
  }, [filters]);

  return (
    <ListingContext.Provider
      value={{ page, setPage, filters, setFilters, sort, setSort }}
    >
      {children}
    </ListingContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useListing = () => {
  const ctx = useContext(ListingContext);
  if (!ctx) throw new Error("useListing must be used inside ListingProvider");
  return ctx;
};
