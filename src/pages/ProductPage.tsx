import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductsById } from "../api/services/productService";
import type { Product } from "../interfaces/product";
import ImagesSection from "../components/productPageComponents/ImagesSection";
import DetailsSection from "../components/productPageComponents/DetailsSection";

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product>();
  const [currQuantity, setCurrQuantity] = useState<number>(1);
  const [currColor, setCurrColor] = useState<string>("Default");
  const [currSize, setCurrSize] = useState<string>("XS");

  useEffect(() => {
    getProductsById(id).then((res) => setProduct(res));
  }, [id]);

  const mainImage = (() => {
    if (!product) return "";
    if (currColor === "Default") return product.cover_image;
    const colorIndex = product.available_colors.indexOf(currColor);
    return product.images[colorIndex] || product.cover_image;
  })();

  return (
    <div className="flex flex-col w-full gap-[49px] px-[100px] py-[30px]">
      <h3 className="text-[14px] text-[#10151F] font-light">
        Listing / Product
      </h3>
      <div className="flex flex-col lg:flex-row w-full gap-[168px]">
        <ImagesSection
          product={product}
          setCurrColor={setCurrColor}
          mainImage={mainImage}
        />
        {/* details section */}
        <DetailsSection
          product={product}
          currQuantity={currQuantity}
          setCurrQuantity={setCurrQuantity}
          currColor={currColor}
          setCurrColor={setCurrColor}
          currSize={currSize}
          setCurrSize={setCurrSize}
        />
      </div>
    </div>
  );
}

export default ProductPage;
