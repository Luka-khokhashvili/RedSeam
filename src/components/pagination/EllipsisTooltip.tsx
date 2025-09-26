import React from "react";

interface EllipsisTooltipProps {
  index: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  getHiddenPages: () => number[];
  hovered: boolean;
  onHover: (index: number | null) => void;
}

const EllipsisTooltip: React.FC<EllipsisTooltipProps> = ({
  index,
  currentPage,
  onPageChange,
  getHiddenPages,
  hovered,
  onHover,
}) => {
  const hiddenPages = getHiddenPages();

  if (hiddenPages.length === 0) return <span className="px-3 py-1">...</span>;

  return (
    <div
      className="relative"
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
    >
      <span className="px-3 py-1 cursor-pointer">...</span>

      {hovered && (
        <div className="absolute -top-[55px] left-1/2 -translate-x-1/2 bg-white border border-gray-300 shadow-lg rounded-lg p-3 flex justify-evenly gap-2 z-10">
          {hiddenPages.map((hp) => (
            <button
              key={`hp-${hp}`}
              onClick={() => onPageChange(hp)}
              className={`px-[14px] py-[5px] border rounded text-sm ${
                hp === currentPage
                  ? "border-[#FF4000] text-[#FF4000]"
                  : "border-[#F8F6F7] hover:border-[#FF4000] hover:text-[#FF4000]"
              }`}
            >
              {hp}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default EllipsisTooltip;
