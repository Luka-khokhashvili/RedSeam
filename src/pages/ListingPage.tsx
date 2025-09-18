function ListingPage() {
  return (
    <section className="flex px-[100px] mt-[72px]">
      <div className="w-full flex justify-between items-center">
        <h1 className="text-[42px] font-semibold">Products</h1>
        <div className="flex items-center gap-[32px]">
          <p className="text-[12px] text-[#3E424A]">
            Showing 1-10 of 100 results
          </p>
          <div className="h-[14px] border border-[#E1DFE1]"></div>
          <button className="flex items-center text-[16px] gap-[10px] cursor-pointer">
            <img className="h-[15px]" src="./Filter.svg" alt="Filters icon" />
            Filter
          </button>
          <button className="flex items-center text-[16px] gap-[9px] cursor-pointer">
            Sort by
            <img className="w-[10px]" src="Arrow.svg" alt="Arrow icon" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default ListingPage;
