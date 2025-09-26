import { Link } from "react-router-dom";
import type { Product } from "../../interfaces/product";

type ProductListingProps = {
  products: Product[];
};

function ProductListing({ products }: ProductListingProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-[24px] gap-y-[48px] mt-[32px]">
      {products.map((product: Product) => (
        <Link
          to={`/product/${product.id}`}
          key={product.id}
          className="flex flex-col w-[206px] lg:w-[412px] gap-[12px] hover:scale-105 transition duration-300"
        >
          <img src={product.cover_image} alt={product.name} />
          <div>
            <h3 className="text-[13px] lg:text-18px text-[#10151F] font-medium">
              {product.name}
            </h3>
            <p className="text-[16px] text-[#10151F] font-medium">
              $ {product.price}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default ProductListing;
