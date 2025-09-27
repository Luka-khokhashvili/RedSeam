type SortBoxProps = {
  setSort: (sortKey: string) => () => void;
};

function SortBox({ setSort }: SortBoxProps) {
  return (
    <div className="absolute flex flex-col top-[33.5px] -right-[16px] rounded-[8px] bg-white w-[223px] gap-[16px] p-[16px] border border-[#E1DFE1] z-10">
      <h3 className="text-[16px] text-[#10151F] font-semibold">Sort by</h3>
      <ul className="flex flex-col">
        <li
          onClick={setSort("created_at")}
          className="py-[8px] text-[16px] text-[#10151F] hover:text-[#FF4000] transition duration-300 cursor-pointer"
        >
          New products first
        </li>
        <li
          onClick={setSort("price")}
          className="py-[8px] text-[16px] text-[#10151F] hover:text-[#FF4000] transition duration-300 cursor-pointer"
        >
          Price, low to high
        </li>
        <li
          onClick={setSort("-price")}
          className="py-[8px] text-[16px] text-[#10151F] hover:text-[#FF4000] transition duration-300 cursor-pointer"
        >
          Price, high to low
        </li>
      </ul>
      <div className="flex justify-end">
        <button
          onClick={setSort("")}
          className="w-[60%] text-[14px] text-white bg-[#ff4000] hover:bg-[#FF1000] px-[42px] py-[10px] rounded-[10px] cursor-pointer transition duration-300"
        >
          Clear
        </button>
      </div>
    </div>
  );
}

export default SortBox;
