import type { Product } from "../../interfaces/product";
import getColorStyle from "../../utils/getColorStyle";
import handleAddCart from "../../utils/handleAddCart";
import QuantityDropdown from "../QuantityDropDown";

type DetailsSectionProps = {
  product: Product | undefined;
  currQuantity: number;
  setCurrQuantity: React.Dispatch<React.SetStateAction<number>>;
  currColor: string;
  setCurrColor: React.Dispatch<React.SetStateAction<string>>;
  currSize: string;
  setCurrSize: React.Dispatch<React.SetStateAction<string>>;
};

function DetailsSection({
  product,
  currQuantity,
  setCurrQuantity,
  currColor,
  setCurrColor,
  currSize,
  setCurrSize,
}: DetailsSectionProps) {
  return (
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
            {product?.available_colors?.map((color, i) => (
              <div
                key={i}
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
              product?.available_sizes.map((size, i) => (
                <button
                  key={i}
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
          onClick={() =>
            handleAddCart({
              product,
              currQuantity,
              currColor,
              currSize,
            })
          }
          className="flex w-full h-[59px] text-[18px] text-white bg-[#FF4000] font-medium justify-center items-center gap-[10px] rounded-[10px] cursor-pointer"
        >
          <img src="/ShoppingCart.svg" alt="shopping cart" />
          <span>Add to cart</span>
        </button>

        <hr className="w-full border border-[#E1DFE1]" />

        {/* details */}
        <div className="w-full gap-[7px]">
          <div className="flex w-full justify-between items-center">
            <h2 className="text-[20px] text-[#10151F] font-medium">Details</h2>
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
            <p className="text-[16px] text-[#3E424A]">{product?.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailsSection;
