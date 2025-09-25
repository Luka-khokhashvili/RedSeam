import { useMemo, useState } from "react";

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

  const visibleSet = useMemo(() => {
    const set = new Set<number>();
    for (let i = 1; i <= totalPages; i++) {
      if (
        i <= 2 ||
        i > totalPages - 2 ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        set.add(i);
      }
    }
    return set;
  }, [currentPage, totalPages]);

  const pages = useMemo<(number | "...")[]>(() => {
    const arr: (number | "...")[] = [];
    for (let i = 1; i <= totalPages; i++) {
      if (visibleSet.has(i)) {
        arr.push(i);
      } else if (arr[arr.length - 1] !== "...") {
        arr.push("...");
      }
    }
    return arr;
  }, [visibleSet, totalPages]);

  const getHiddenPages = (ellipsisIndex: number): number[] => {
    let prevVisible: number | null = null;
    for (let i = ellipsisIndex - 1; i >= 0; i--) {
      const v = pages[i];
      if (typeof v === "number") {
        prevVisible = v;
        break;
      }
    }

    let nextVisible: number | null = null;
    for (let i = ellipsisIndex + 1; i < pages.length; i++) {
      const v = pages[i];
      if (typeof v === "number") {
        nextVisible = v;
        break;
      }
    }

    if (prevVisible == null || nextVisible == null) return [];

    const start = prevVisible + 1;
    const end = nextVisible - 1;
    if (start > end) return [];

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

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
          <div
            key={`ell-${i}`}
            className="relative"
            onMouseEnter={() => setHoveredEllipsis(i)}
            onMouseLeave={() => setHoveredEllipsis(null)}
          >
            <span className="px-3 py-1 cursor-pointer">...</span>

            {hoveredEllipsis === i && (
              <div className="absolute -top-[55px] left-1/2 -translate-x-1/2 bg-white border border-gray-300 shadow-lg rounded-lg p-3 flex justify-evenly gap-2 z-10">
                {getHiddenPages(i).map((hp) => (
                  <button
                    key={`hp-${hp}`}
                    onClick={() => {
                      onPageChange(hp);
                      setHoveredEllipsis(null);
                    }}
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
