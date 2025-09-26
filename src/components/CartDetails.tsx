import { Link } from "react-router-dom";
import type { Cart } from "../interfaces/cart";
import getImageForColor from "../utils/getImageForColor";
import handleQuantityChange from "../utils/handleQuantityChange";
import handleDelete from "../utils/handleDelete";

type CheckoutDetailsProps = {
  products: Cart[];
  setProducts: React.Dispatch<React.SetStateAction<Cart[]>>;
  showPayButton?: boolean;
};

function CartDetails({
  products,
  setProducts,
  showPayButton = false,
}: CheckoutDetailsProps) {
  const calcSubtotal = (products: Cart[]) =>
    products.reduce(
      (sum, product) => sum + product.total_price * product.quantity,
      0
    );

  const delivery = 5;

  const subtotal = calcSubtotal(products);
  const total = subtotal + delivery;

  return (
    <div className="flex flex-col w-full lg:w-[460px] h-full">
      <div className="flex flex-col h-full gap-[81px]">
        {products.length <= 0 ? (
          <div className="flex flex-col w-full pt-[150px] justify-center items-center">
            <img src="/CartRed.svg" alt="Cart" />
            <h2 className="text-[24px] text-[#10151F] font-semibold mt-[24px]">
              Ooops!
            </h2>
            <p className="text-[14px] text-[#3E424A] mt-[10px]">
              You’ve got nothing in your cart just yet...
            </p>
            <Link
              to={"/"}
              className="flex w-[214px] items-center justify-center text-[14px] text-white mt-[58px] py-[10px] bg-[#FF4000] rounded-[10px] cursor-pointer"
            >
              Start shopping
            </Link>
          </div>
        ) : (
          <>
            <div
              className="flex-1 overflow-y-auto pr-2"
              style={{ scrollbarColor: "#FF4000 transparent" }}
            >
              <div className="flex flex-col gap-[36px]">
                {products.map((product, index) => (
                  <div key={index} className="flex w-full gap-[17px] h-[134px]">
                    <img
                      className="w-[100px] border border-[#E1DFE1] rounded-[10px]"
                      src={getImageForColor(product)}
                      alt="Product cover"
                    />
                    <div className="flex w-full flex-col gap-[8px] py-[8.5px]">
                      <p className="flex w-full justify-between items-center text-[#10151F] font-medium">
                        <span className="text-[14px]">{product.name}</span>
                        <span className="text-[18px]">
                          $ {product.price * product.quantity}
                        </span>
                      </p>
                      <p className="text-[12px] text-[#3E424A]">
                        {product.color}
                      </p>
                      <p className="text-[12px] text-[#3E424A]">
                        {product.size}
                      </p>
                      <div className="flex w-full justify-between items-center">
                        <div className="flex gap-[9px] py-[4px] px-[10px] border border-[#E1DFE1] rounded-[22px]">
                          <button
                            onClick={() =>
                              product.quantity > 1 &&
                              handleQuantityChange(
                                product,
                                product.quantity - 1,
                                setProducts
                              )
                            }
                            disabled={product.quantity <= 1}
                            className="disabled:text-[#E1DFE1] disabled:cursor-not-allowed cursor-pointer"
                          >
                            -
                          </button>
                          <p className="cursor-default">{product.quantity}</p>
                          <button
                            onClick={() =>
                              handleQuantityChange(
                                product,
                                product.quantity + 1,
                                setProducts
                              )
                            }
                            className="cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => handleDelete(product, setProducts)}
                          className="text-[12px] text-[#3E424A] cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-[16px] mt-4">
              <p className="text-[16px] text-[#3E424A] flex w-full justify-between">
                <span>Items subtotal</span>
                <span>$ {subtotal}</span>
              </p>
              <p className="text-[16px] text-[#3E424A] flex w-full justify-between">
                <span>Delivery</span>
                <span>$ {delivery}</span>
              </p>
              <p className="text-[20px] text-[#10151F] font-medium flex w-full justify-between">
                <span>Total</span>
                <span>$ {total}</span>
              </p>
            </div>
          </>
        )}

        {showPayButton && (
          <div>
            {products.length > 0 && (
              <button
                type="submit"
                form="checkoutForm"
                className="flex w-full justify-center items-center py-[16px] bg-[#FF4000] text-white rounded-[10px] cursor-pointer"
              >
                Pay
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default CartDetails;
