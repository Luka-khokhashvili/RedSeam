type CartSideBarProps = {
  setShowCartBar: React.Dispatch<React.SetStateAction<boolean>>;
};

function CartSideBar({ setShowCartBar }: CartSideBarProps) {
  return (
    <>
      <div className="fixed top-0 left-0 w-screen h-screen bg-[#10151F] opacity-[30%]"></div>
      <div
        className="fixed top-0 right-0 w-[540px] h-screen p-[40px] bg-[#F8F6F7] border border-[#E1DFE1] z-10
                 grid grid-rows-[auto_62px_minmax(0,1fr)_102px_auto]"
      >
        <div className="flex w-full justify-between items-center">
          <h2 className="text-[20px] text-[#10151F] font-medium">
            Shopping cart (2)
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
              <div className="bg-white w-full h-[134px] rounded" />
              <div className="bg-white w-full h-[134px] rounded" />
              <div className="bg-white w-full h-[134px] rounded" />
              <div className="bg-white w-full h-[134px] rounded" />
              <div className="bg-white w-full h-[134px] rounded" />
            </div>
          </div>

          <div className="flex flex-col gap-[16px] mt-4">
            <p className="text-[16px] text-[#3E424A] flex w-full justify-between">
              <span>Items subtotal</span>
              <span>$50</span>
            </p>
            <p className="text-[16px] text-[#3E424A] flex w-full justify-between">
              <span>Delivery</span>
              <span>$5</span>
            </p>
            <p className="text-[20px] text-[#10151F] font-medium flex w-full justify-between">
              <span>Total</span>
              <span>$55</span>
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
