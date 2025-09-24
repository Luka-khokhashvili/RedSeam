import { useState } from "react";

function QuantityDropdown({
  currQuantity,
  setCurrQuantity,
}: {
  currQuantity: number;
  setCurrQuantity: (q: number) => void;
}) {
  const [open, setOpen] = useState(false);

  const handleSelect = (quantity: number) => {
    setCurrQuantity(quantity);
    setOpen(false);
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center justify-between w-[70px] px-[15px] py-[9px] border border-[#E1DFE1] rounded cursor-pointer relative"
      >
        {currQuantity}
        <img
          src="/Arrow.svg"
          alt="Arrow"
          className={`ml-[10px] transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute grid grid-cols-2 left-0 mt-1 w-[134px] bg-white border border-[#E1DFE1] rounded shadow-lg z-20">
          {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
            <div
              key={num}
              onClick={() => handleSelect(num)}
              className="px-[15px] py-[9px] hover:bg-[#F8F6F7] cursor-pointer"
            >
              {num}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default QuantityDropdown;
