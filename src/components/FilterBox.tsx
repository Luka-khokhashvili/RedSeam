function FilterBox() {
  return (
    <div className="absolute flex flex-col top-[33.5px] -right-[16px] rounded-[8px] bg-white w-[392px] gap-[20px] p-[16px] border border-[#E1DFE1] z-10">
      <h3 className="text-[#10151F] text-[16px] font-semibold">Select price</h3>
      <div className="flex flex-col items-end gap-[10px]">
        <div className="flex justify-between w-full">
          <div className="relative w-[175px]">
            <input
              type="text"
              className="w-full px-[12px] py-[10.5px] border border-gray-300 rounded peer focus:outline-none"
            />
            <span className="absolute left-[12px] top-1/2 -translate-y-1/2 text-[14px] text-[#3E424A] pointer-events-none peer-placeholder-shown:block peer-focus:hidden">
              From <span className="text-[#FF4000]">*</span>
            </span>
          </div>
          <div className="relative w-[175px]">
            <input
              type="text"
              className="w-full px-[12px] py-[10.5px] border border-gray-300 rounded peer focus:outline-none"
            />
            <span className="absolute left-[12px] top-1/2 -translate-y-1/2 text-[14px] text-[#3E424A] pointer-events-none peer-placeholder-shown:block peer-focus:hidden">
              To <span className="text-[#FF4000]">*</span>
            </span>
          </div>
        </div>
        <button className="text-[14px] text-white bg-[#ff4000] hover:bg-[#FF1000] px-[42px] py-[10px] rounded-[10px] cursor-pointer transition duration-300">
          Apply
        </button>
      </div>
    </div>
  );
}

export default FilterBox;
