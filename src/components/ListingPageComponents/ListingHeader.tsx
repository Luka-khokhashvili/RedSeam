import FilterBox from "../FilterBox";
import SortBox from "../SortBox";

type Meta = {
  from?: number;
  to?: number;
  total?: number;
};

type Filters = {
  priceFrom: number | undefined;
  priceTo: number | undefined;
};

type ListingHeaderProps = {
  meta?: Meta;
  filters: Filters;
  setFilters: (filters: Filters) => void;
  setSort: (sortKey: string) => void;
  filterRef: React.RefObject<HTMLDivElement | null>;
  sortRef: React.RefObject<HTMLDivElement | null>;
  filterOpen: boolean;
  sortOpen: boolean;
  openFilterBox: () => void;
  openSort: () => void;
};

function ListingHeader({
  meta,
  filters,
  setFilters,
  setSort,
  filterRef,
  sortRef,
  filterOpen,
  sortOpen,
  openFilterBox,
  openSort,
}: ListingHeaderProps) {
  return (
    <div className="flex w-full flex-col gap-[19px]">
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
              <img
                className={`h-[15px] transition-transform duration-50 ease-in-out transform ${
                  filterOpen && "scale-x-[-1]"
                }`}
                src="./Filter.svg"
                alt="Filters icon"
              />
              Filter
            </button>
            {filterOpen && (
              <FilterBox
                filters={filters}
                setFilters={setFilters}
                openFilterBox={openFilterBox}
              />
            )}
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
      {filters.priceFrom && filters.priceTo && (
        <div className="flex w-[141px] h-[37px] justify-center items-center border border-[#E1DFE1] rounded-[50px]">
          <p className="flex gap-[8.62px] text-[14px] text-[#3E424A]">
            <span>
              Price: {filters.priceFrom}-{filters.priceTo}
            </span>
            <button
              onClick={() => {
                setFilters({ priceFrom: undefined, priceTo: undefined });
              }}
              className="cursor-pointer"
            >
              <img
                className="w-[6.75px] aspect-square"
                src="/x.svg"
                alt="clear"
              />
            </button>
          </p>
        </div>
      )}
    </div>
  );
}

export default ListingHeader;
