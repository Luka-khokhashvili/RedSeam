import { useEffect, useMemo, useRef, useState } from "react";
import { useProducts } from "../api/hooks/useProducts";
import Pagination from "../components/pagination/Paginations";
import { useListing } from "../contexts/ListingContext";
import ListingHeader from "../components/listingPage/ListingHeader";
import ProductListing from "../components/listingPage/ProductListing";

function ListingPage() {
  const { page, setPage, filters, setFilters, sort, setSort } = useListing();

  const filterRef = useRef<HTMLDivElement | null>(null);
  const [filterOpen, setFilterOpen] = useState(false);

  const sortRef = useRef<HTMLDivElement | null>(null);
  const [sortOpen, setSortOpen] = useState(false);

  const params = useMemo(
    () => ({
      page: page,
      "filter[price_from]": filters.priceFrom,
      "filter[price_to]": filters.priceTo,
      sort: sort,
    }),
    [page, filters, sort]
  );
  const { data, loading, error } = useProducts(params);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node) &&
        sortRef.current &&
        !sortRef.current.contains(event.target as Node)
      ) {
        setFilterOpen(false);
        setSortOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Failed to load products</p>;

  const products = data?.data ?? [];
  const meta = data?.meta;
  const totalPages = meta?.last_page ?? 1;

  const openFilterBox = () => {
    setFilterOpen((prev) => {
      if (!prev) setSortOpen(false);
      return !prev;
    });
  };

  const openSort = () => {
    setSortOpen((prev) => {
      if (!prev) setFilterOpen(false);
      return !prev;
    });
  };

  return (
    <section className="flex flex-col px-[100px] mt-[72px]">
      {/* Header */}
      <ListingHeader
        meta={meta}
        filters={filters}
        setFilters={setFilters}
        setSort={setSort}
        filterRef={filterRef}
        sortRef={sortRef}
        filterOpen={filterOpen}
        sortOpen={sortOpen}
        openFilterBox={openFilterBox}
        openSort={openSort}
      />
      {/* Products Listing */}
      <ProductListing products={products} />

      {totalPages >= 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
    </section>
  );
}

export default ListingPage;
