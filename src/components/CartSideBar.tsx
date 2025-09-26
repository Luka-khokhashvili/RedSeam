import { useEffect, useState } from "react";
import { getCart } from "../api/services/cartService";
import type { Cart } from "../interfaces/cart";
import { Link } from "react-router-dom";
import CartDetails from "./CartDetails";
type CartSideBarProps = {
  setShowCartBar: React.Dispatch<React.SetStateAction<boolean>>;
};

function CartSideBar({ setShowCartBar }: CartSideBarProps) {
  const [products, setProducts] = useState<Cart[]>([]);

  useEffect(() => {
    getCart().then((res) => setProducts(res));
  }, []);

  return (
    <>
      <div
        className="fixed top-0 left-0 w-screen h-screen bg-[#10151F] opacity-[30%] z-9"
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
            <CartDetails products={products} setProducts={setProducts} />
          )}
        </div>

        <div />

        <div>
          {products.length > 0 && (
            <Link
              to={"/checkout"}
              onClick={() => setShowCartBar(false)}
              className="flex w-full justify-center items-center py-[16px] bg-[#FF4000] text-white rounded-[10px] cursor-pointer"
            >
              Go to checkout
            </Link>
          )}
        </div>
      </div>
    </>
  );
}

export default CartSideBar;
