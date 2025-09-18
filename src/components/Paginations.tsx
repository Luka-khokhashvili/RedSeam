interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const getPages = () => {
    const pages: (number | "...")[] = [];

    for (let i = 1; i <= totalPages; i++) {
      if (
        i <= 2 ||
        i > totalPages - 2 ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== "...") {
        pages.push("...");
      }
    }

    return pages;
  };

  const pages = getPages();

  return (
    <div className="flex items-center justify-center space-x-2 mt-[90px] mb-[216px]">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="px-3 py-1 text-[#10151F]"
      >
        &lt;
      </button>

      {pages.map((p, i) =>
        p === "..." ? (
          <span key={i} className="px-3 py-1">
            ...
          </span>
        ) : (
          <button
            key={i}
            onClick={() => onPageChange(p)}
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
};

export default Pagination;
