import { useEffect, useState } from "react";
import {
  checkout,
  deleteCartProduct,
  getCart,
  patchCartProduct,
} from "../api/services/cartService";
import type {
  Cart,
  CartDeleteBody,
  CheckoutRequestBody,
} from "../interfaces/cart";
type CartSideBarProps = {
  setShowCartBar: React.Dispatch<React.SetStateAction<boolean>>;
};

const calcSubtotal = (products: Cart[]) =>
  products.reduce(
    (sum, product) => sum + product.total_price * product.quantity,
    0
  );

const delivery = 5;

function CartSideBar({ setShowCartBar }: CartSideBarProps) {
  const [products, setProducts] = useState<Cart[]>([]);

  useEffect(() => {
    getCart().then((res) => setProducts(res));
  }, []);

  const handleQuantityChange = async (product: Cart, newQuantity: number) => {
    try {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === product.id ? { ...p, quantity: newQuantity } : p
        )
      );

      await patchCartProduct(product.id, { quantity: newQuantity });
    } catch (error) {
      console.error("Failed to update quantity:", error);
      setProducts((prev) =>
        prev.map((p) =>
          p.id === product.id ? { ...p, quantity: product.quantity } : p
        )
      );
    }
  };

  const getImageForColor = (product: Cart) => {
    if (!product.images || !product?.available_colors)
      return product.cover_image;

    const colorIndex = product.available_colors.indexOf(product.color);
    return product.images[colorIndex] || product.cover_image;
  };

  const handleDelete = async (product: Cart) => {
    try {
      const deleteBody: CartDeleteBody = {
        color: product.color,
        size: product.size,
      };

      await deleteCartProduct(product.id, deleteBody);

      setProducts((prev) =>
        prev.filter(
          (p) =>
            !(
              p.id === product.id &&
              p.color === product.color &&
              p.size === product.size
            )
        )
      );
    } catch (error) {
      console.error("Failed to remove product:", error);
    }
  };

  const handleCheckout = async () => {
    const testBody: CheckoutRequestBody = {
      name: "testname",
      surname: "testsurname",
      email: "testemail@gmail.com",
      zip_code: "1000",
      address: "testaddress",
    };

    try {
      await checkout(testBody);

      setProducts([]);
    } catch (error) {
      console.error("Failed to check out:", error);
    }
  };

  const subtotal = calcSubtotal(products);
  const total = subtotal + delivery;

  return (
    <>
      <div
        className="fixed top-0 left-0 w-screen h-screen bg-[#10151F] opacity-[30%]"
        onClick={() => setShowCartBar(false)}
      ></div>
      <div
        className="fixed top-0 right-0 w-[540px] h-screen p-[40px] bg-[#F8F6F7] border border-[#E1DFE1] z-10
        grid grid-rows-[auto_62px_minmax(0,1fr)_102px_auto]"
      >
        {/* Top Bar */}
        <div className="flex w-full justify-between items-center">
          <h2 className="text-[20px] text-[#10151F] font-medium">
            Shopping cart ({products.length})
          </h2>
          <button
            onClick={() => {
              setShowCartBar(false);
            }}
            className="cursor-pointer"
          >
            <img src="/x.svg" alt="Close" />
          </button>
        </div>

        <div />

        {/* Main content */}
        <div className="min-h-0 flex flex-col">
          {products.length <= 0 ? (
            <div className="flex flex-col w-full pt-[150px] justify-center items-center">
              <img src="/CartRed.svg" alt="Cart" />
              <h2 className="text-[24px] text-[#10151F] font-semibold mt-[24px]">
                Ooops!
              </h2>
              <p className="text-[14px] text-[#3E424A] mt-[10px]">
                You’ve got nothing in your cart just yet...
              </p>
              <button
                onClick={() => setShowCartBar(false)}
                className="flex w-[214px] items-center justify-center text-[14px] text-white mt-[58px] py-[10px] bg-[#FF4000] rounded-[10px] cursor-pointer"
              >
                Start shopping
              </button>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto pr-2">
                <div className="flex flex-col gap-[36px]">
                  {products.map((product, index) => (
                    <div
                      key={index}
                      className="flex w-full gap-[17px] h-[134px]"
                    >
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
                                  product.quantity - 1
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
                                  product.quantity + 1
                                )
                              }
                              className="cursor-pointer"
                            >
                              +
                            </button>
                          </div>
                          <button
                            onClick={() => handleDelete(product)}
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
        </div>

        <div />

        <div>
          {products.length > 0 && (
            <button
              onClick={() => handleCheckout()}
              className="flex w-full justify-center items-center py-[16px] bg-[#FF4000] text-white rounded-[10px] cursor-pointer"
            >
              Go to checkout
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default CartSideBar;
