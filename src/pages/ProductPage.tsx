import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductsById } from "../api/services/productService";
import type { Product } from "../interfaces/product";
import QuantityDropdown from "../components/QuantityDropDown";
import { postCartProduct } from "../api/services/cartService";
import type { CartPostBody } from "../interfaces/cart";

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product>();
  const [currColor, setCurrColor] = useState<string>("Default");
  const [currSize, setCurrSize] = useState<string>("XS");
  const [currQuantity, setCurrQuantity] = useState<number>(1);

  useEffect(() => {
    getProductsById(id).then((res) => setProduct(res));
  }, [id]);

  const hanldeAddCart = async () => {
    try {
      const productDetails: CartPostBody = {
        quantity: currQuantity,
        color: currColor,
        size: currSize,
      };

      await postCartProduct(product?.id, productDetails);
    } catch (error) {
      console.error(error);
    }
  };

  const mainImage = (() => {
    if (!product) return "";
    if (currColor === "Default") return product.cover_image;
    const colorIndex = product.available_colors.indexOf(currColor);
    return product.images[colorIndex] || product.cover_image;
  })();

  const getColorStyle = (color: string): React.CSSProperties => {
    switch (color.toLowerCase()) {
      case "white":
        return {
          backgroundColor: "white",
          border: "1px solid #ccc",
        };
      case "navy blue":
        return {
          backgroundColor: "#000080",
        };
      case "cream":
        return {
          backgroundColor: "#FFFDD0",
        };
      case "peach":
        return {
          backgroundColor: "#FFD3AC",
        };
      case "off white":
        return {
          backgroundColor: "#FAF9F6",
          border: "1px solid #ccc",
        };
      case "mauve":
        return {
          backgroundColor: "#E0B0FF",
          border: "1px solid #ccc",
        };
      case "multi":
        return {
          background:
            "linear-gradient(45deg, yellow 0%, brown 20%, green 60%, blue 80%)",
        };
      default:
        return {
          backgroundColor: color.toLowerCase(),
        };
    }
  };

  return (
    <div className="flex flex-col w-full gap-[49px] px-[100px] py-[30px]">
      <h3 className="text-[14px] text-[#10151F] font-light">
        Listing / Product
      </h3>
      <div className="flex flex-col lg:flex-row w-full gap-[168px]">
        <div className="flex gap-[24px]">
          <div className="flex flex-col gap-[9px]">
            {product?.images.map((link, index) => (
              <img
                onClick={() => {
                  const color = product.available_colors[index] || "Default";
                  setCurrColor(color);
                }}
                key={index}
                className="w-[121px] h-[161.33px]"
                src={link}
                alt="product image"
              />
            ))}
          </div>
          {/* main image */}
          <img
            className="w-[603px] lg:w-[703px] h-[937px] rounded-[10px]"
            src={mainImage}
            alt={product?.name}
          />
        </div>
        {/* details section */}
        <div className="flex w-[704px] flex-col gap-[56px]">
          <div className="flex flex-col gap-[21px]">
            <h1 className="text-[32px] text-[#10151F] font-semibold">
              {product?.name}
            </h1>
            <h2 className="text-[32px] text-[#10151F] font-semibold">
              $ {product?.price}
            </h2>
          </div>
          {/* Color and size */}
          <div className="flex flex-col gap-[48px]">
            {/* color */}
            <div className="flex flex-col gap-[16px]">
              <p className="text-[16px] text-[#10151F]">Color: {currColor}</p>
              <div className="flex gap-[8px]">
                {product?.available_colors?.map((color) => (
                  <div
                    className={`w-[48px] aspect-square p-[4px] border rounded-[50%] cursor-pointer ${
                      color === currColor
                        ? "border border-[#E1DFE1]"
                        : "border-transparent"
                    }`}
                  >
                    <div
                      onClick={() => {
                        setCurrColor(color);
                      }}
                      className="w-[38px] aspect-square rounded-[50%]"
                      style={getColorStyle(color)}
                    ></div>
                  </div>
                ))}
              </div>
            </div>
            {/* size */}
            <div className="flex flex-col gap-[16px]">
              <p className="text-[16px] text-[#10151F]">Size: {currSize}</p>
              <div className="flex gap-[8px]">
                {product?.available_sizes ? (
                  product?.available_sizes.map((size) => (
                    <button
                      className={`flex w-[70px] h-[42px] justify-center items-center border rounded-[10px] cursor-pointer ${
                        currSize === size
                          ? "border-[#10151F] bg-[#F8F6F7]"
                          : "border-[#E1DFE1] bg-transparent"
                      }`}
                      onClick={() => setCurrSize(size)}
                    >
                      {size}
                    </button>
                  ))
                ) : (
                  <button
                    className={`flex w-[70px] h-[42px] justify-center items-center border rounded-[10px] cursor-pointer ${
                      currSize === product?.size
                        ? "border-[#10151F] bg-[#F8F6F7]"
                        : "border-[#E1DFE1] bg-transparent"
                    }`}
                    onClick={() => setCurrSize(currSize)}
                  >
                    {currSize}
                  </button>
                )}
              </div>
            </div>
            {/* Quantity */}
            <div className="flex flex-col gap-[16px]">
              <p className="text-[16px] text-[#10151F]">Quantity</p>
              <QuantityDropdown
                currQuantity={currQuantity}
                setCurrQuantity={setCurrQuantity}
              />
            </div>
            {/* Checkout button */}
            <button
              onClick={() => hanldeAddCart()}
              className="flex w-full h-[59px] text-[18px] text-white bg-[#FF4000] font-medium justify-center items-center gap-[10px] rounded-[10px] cursor-pointer"
            >
              <img src="/ShoppingCart.svg" alt="shopping cart" />
              <span>Add to cart</span>
            </button>

            <hr className="w-full border border-[#E1DFE1]" />

            {/* details */}
            <div className="w-full gap-[7px]">
              <div className="flex w-full justify-between items-center">
                <h2 className="text-[20px] text-[#10151F] font-medium">
                  Details
                </h2>
                <img
                  className="h-[60px]"
                  src={product?.brand.image}
                  alt={product?.brand.name}
                />
              </div>
              <div className="flex flex-col gap-[19px]">
                <p className="text-[16px] text-[#3E424A]">
                  Brand: {product?.brand.name}
                </p>
                <p className="text-[16px] text-[#3E424A]">
                  {product?.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
