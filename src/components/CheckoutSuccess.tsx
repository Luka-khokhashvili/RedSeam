import type { Dispatch, SetStateAction } from "react";
import { Link } from "react-router-dom";

interface CheckoutSuccessProps {
  setModalOpen: Dispatch<SetStateAction<boolean>>;
}

function CheckoutSuccess({ setModalOpen }: CheckoutSuccessProps) {
  return (
    <div className="fixed top-1/2 left-1/2 -translate-1/2 bg-white border border-[#E1DFE1] rounded-[8px] shadow flex flex-col w-[876px] h-[590px] items-end p-[30px] z-11">
      <button onClick={() => setModalOpen(false)} className="cursor-pointer">
        <img src="/x.svg" alt="Close" />
      </button>

      <div className="flex flex-col w-full h-full gap-[40px] justify-center items-center">
        <div className="w-[76px] bg-[#F8F6F7] flex items-center justify-center aspect-square rounded-full">
          <img src="/Success.svg" alt="Success icon" />
        </div>
        <div className="flex flex-col items-center gap-[74px]">
          <div className="flex flex-col items-center gap-[16px]">
            <h1 className="text-[42px] text-[#10151F] font-semibold">
              Congrats
            </h1>
            <p className="text-[14px] text-[#3E424A]">
              Your order is placed successfully!
            </p>
          </div>
          <Link
            to={"/"}
            className="text-[14px] text-white flex w-[214px] h-[41px] justify-center items-center bg-[#FF4000] rounded-[10px] cursor-pointer"
          >
            Continue shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CheckoutSuccess;
