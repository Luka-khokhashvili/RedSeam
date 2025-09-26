import { useState } from "react";
import EllipsisTooltip from "./EllipsisTooltip";
import getHiddenPages from "../../utils/getHiddenPages";
import useBuildPagesArray from "../../hooks/buildPagesArray";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const [hoveredEllipsis, setHoveredEllipsis] = useState<number | null>(null);

  const pages = useBuildPagesArray({ currentPage, totalPages });

  const handleEllipsisHover = (index: number | null) =>
    setHoveredEllipsis(index);

  return (
    <div className="flex items-center justify-center space-x-2 mt-[90px] mb-[216px] relative">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="px-3 py-1 text-[#10151F]"
      >
        &lt;
      </button>

      {pages.map((p, i) =>
        p === "..." ? (
          <EllipsisTooltip
            key={`ell-${i}`}
            index={i}
            currentPage={currentPage}
            onPageChange={onPageChange}
            getHiddenPages={() => getHiddenPages(pages, i)}
            hovered={hoveredEllipsis === i}
            onHover={handleEllipsisHover}
          />
        ) : (
          <button
            key={`p-${p}`}
            onClick={() => onPageChange(p as number)}
            className={`px-[14px] py-[5px] border rounded ${
              p === currentPage
                ? "border-[#FF4000] text-[#FF4000]"
                : "border-[#F8F6F7] text-[#212B36]"
            }`}
          >
            {p}
          </button>
        )
      )}

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="px-3 py-1 text-[#10151F]"
      >
        &gt;
      </button>
    </div>
  );
}

export default Pagination;
