import { useEffect, useMemo, useRef, useState } from "react";
import { useProducts } from "../api/hooks/useProducts";
import type { Product } from "../interfaces/product";
import Pagination from "../components/Paginations";
import FilterBox from "../components/FilterBox";
import SortBox from "../components/SortBox";

function ListingPage() {
  const [page, setPage] = useState(1);

  const filterRef = useRef<HTMLDivElement | null>(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState<{
    priceFrom: number | undefined;
    priceTo: number | undefined;
  }>({
    priceFrom: undefined,
    priceTo: undefined,
  });

  const sortRef = useRef<HTMLDivElement | null>(null);
  const [sortOpen, setSortOpen] = useState(false);
  const [sort, setSort] = useState("");

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
      <div className="w-full flex justify-between items-center">
        <h1 className="text-[42px] font-semibold">Products</h1>
        <div className="relative flex items-center gap-[32px]">
          <p className="text-[12px] text-[#3E424A]">
            Showing {meta?.from}-{meta?.to} of {meta?.total} results
          </p>
          <div className="h-[14px] border border-[#E1DFE1]"></div>
          <div className="relative" ref={filterRef}>
            <button
              onClick={openFilterBox}
              className="flex items-center text-[16px] gap-[10px] cursor-pointer"
            >
              <img className="h-[15px]" src="./Filter.svg" alt="Filters icon" />
              Filter
            </button>
            {filterOpen && <FilterBox setFilters={setFilters} />}
          </div>

          <div className="relative" ref={sortRef}>
            <button
              onClick={openSort}
              className="flex items-center text-[16px] gap-[9px] cursor-pointer"
            >
              Sort by
              <img
                className={`w-[10px] ${
                  sortOpen && "-rotate-180"
                } transition duration-100`}
                src="Arrow.svg"
                alt="Arrow icon"
              />
            </button>
            {sortOpen && (
              <SortBox setSort={(sortKey: string) => () => setSort(sortKey)} />
            )}
          </div>
        </div>
      </div>

      {/* Products Listing */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-[24px] gap-y-[48px] mt-[32px]">
        {products.map((product: Product) => (
          <a
            href=""
            key={product.id}
            className="flex flex-col w-[206px] lg:w-[412px] gap-[12px] hover:scale-105 transition duration-300"
          >
            <img src={product.cover_image} alt={product.name} />
            <div>
              <h3 className="text-[13px] lg:text-18px text-[#10151F] font-medium">
                {product.name}
              </h3>
              <p className="text-[16px] text-[#10151F] font-medium">
                $ {product.price}
              </p>
            </div>
          </a>
        ))}
      </div>

      {totalPages > 1 && (
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
