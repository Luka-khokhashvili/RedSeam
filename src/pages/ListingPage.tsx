import { useMemo, useState } from "react";
import { useProducts } from "../api/hooks/useProducts";
import type { Product } from "../interfaces/product";
import Pagination from "../components/Paginations";

function ListingPage() {
  const [page, setPage] = useState(1);

  const params = useMemo(() => ({ page: page }), [page]);
  const { data, loading, error } = useProducts(params);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Failed to load products</p>;

  return (
    <section className="flex flex-col px-[100px] mt-[72px]">
      <div className="w-full flex justify-between items-center">
        <h1 className="text-[42px] font-semibold">Products</h1>
        <div className="flex items-center gap-[32px]">
          <p className="text-[12px] text-[#3E424A]">
            Showing {data?.meta.from}-{data?.meta.to} of {data?.meta.total}{" "}
            results
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

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-[24px] gap-y-[48px] mt-[32px]">
        {data?.data.map((product: Product) => (
          <a
            href=""
            className="flex flex-col w-[206px] lg:w-[412px] gap-[12px]"
            key={product.id}
          >
            <img src={product.cover_image} alt={product.name} />
            <div>
              <h3 className="text-[18px] text-[#10151F] font-medium">
                {product.name}
              </h3>
              <p className="text-[16px] text-[#10151F] font-medium">
                $ {product.price}
              </p>
            </div>
          </a>
        ))}
      </div>

      {data?.meta?.last_page !== undefined && data.meta.last_page > 1 && (
        <Pagination
          currentPage={page}
          totalPages={data.meta.last_page}
          onPageChange={setPage}
        />
      )}
    </section>
  );
}

export default ListingPage;
