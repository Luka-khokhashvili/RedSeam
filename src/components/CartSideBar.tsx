import { useEffect, useState } from "react";
import { getCart } from "../api/services/cartService";
import type { Cart } from "../interfaces/cart";

type CartSideBarProps = {
  setShowCartBar: React.Dispatch<React.SetStateAction<boolean>>;
};

function CartSideBar({ setShowCartBar }: CartSideBarProps) {
  const [products, setProducts] = useState<Cart[]>([]);

  useEffect(() => {
    getCart().then((res) => setProducts(res));
  }, []);

  const subtotal = () => {
    return products.reduce(
      (sum, product) => sum + product.total_price * product.quantity,
      0
    );
  };
  const delivery = 5;
  const total = subtotal() + delivery;

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
            <img src="./x.svg" alt="Close" />
          </button>
        </div>

        <div />

        <div className="min-h-0 flex flex-col">
          <div className="flex-1 overflow-y-auto pr-2">
            <div className="flex flex-col gap-[36px]">
              {products.map((product, index) => (
                <div key={index} className="flex w-full gap-[17px] h-[134px]">
                  <img
                    className="w-[100px] border border-[#E1DFE1] rounded-[10px]"
                    src={product.cover_image}
                    alt="Product cover"
                  />
                  <div className="flex w-full flex-col gap-[8px] py-[8.5px]">
                    <p className="flex w-full justify-between items-center text-[#10151F] font-medium">
                      <span className="text-[14px]">{product.name}</span>
                      <span className="text-[18px]">
                        $ {product.total_price}
                      </span>
                    </p>
                    <p className="text-[12px] text-[#3E424A]">
                      {product.color}
                    </p>
                    <p className="text-[12px] text-[#3E424A]">{product.size}</p>
                    <div className="flex w-full justify-between items-center">
                      <div className="flex gap-[9px] py-[4px] px-[10px] border border-[#E1DFE1] rounded-[22px]">
                        <button className="cursor-pointer">-</button>
                        <p>{product.quantity}</p>
                        <button className="cursor-pointer">+</button>
                      </div>
                      <button className="text-[12px] text-[#3E424A] cursor-pointer">
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
              <span>$ {subtotal()}</span>
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
        </div>

        <div />

        <div>
          <button className="flex w-full justify-center items-center py-[16px] bg-[#FF4000] text-white rounded-[10px] cursor-pointer">
            Go to checkout
          </button>
        </div>
      </div>
    </>
  );
}

export default CartSideBar;
