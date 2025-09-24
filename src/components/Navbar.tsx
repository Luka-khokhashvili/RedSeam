import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import CartSideBar from "./CartSideBar";

function Navbar() {
  const [dropDown, setDropDown] = useState(false);
  const [showCartBar, setShowCartBar] = useState(false);

  const { user, logout } = useAuth();

  const openDropDown = () => {
    setDropDown((prev) => !prev);
  };

  const hanldeCartOpen = () => {
    setShowCartBar((prev) => !prev);
  };

  return (
    <div
      className={`w-full flex justify-between items-center px-[100px] ${
        user ? "py-[20px]" : "py-[28px]"
      }`}
    >
      <a href={"/"} className="flex gap-[7.75px]">
        <img className="h-[21px]" src="/Logo.svg" alt="ReadSeam Logo" />
        <h3 className="text-[16px] font-semibold">RedSeam Clothing</h3>
      </a>
      <div className="flex items-center gap-4">
        {user ? (
          <div className="flex items-center gap-[20px]">
            <button onClick={hanldeCartOpen} className="cursor-pointer">
              <img src="/Cart.svg" alt="Cart" />
            </button>
            <div className="relative group">
              <button
                onClick={openDropDown}
                className="flex items-center text-[16px] gap-[9px] cursor-pointer"
              >
                <img
                  src={user.avatar || "/User.svg"}
                  alt="User Avatar"
                  className="w-[40px] aspect-square rounded-full cursor-pointer"
                />
                <img
                  className={`w-[10px] ${
                    dropDown && "-rotate-180"
                  } transition duration-100`}
                  src="/Arrow.svg"
                  alt="Arrow icon"
                />
              </button>
              {dropDown && (
                <div className="absolute flex items-center justify-center top-[33.5px] -right-[16px] rounded-[8px] bg-white w-[100px] mt-[10px] p-[16px] border border-[#E1DFE1] transition duration-300 z-10">
                  <button
                    onClick={logout}
                    className="text-sm text-gray-700 hover:text-[#FF4000] cursor-pointer"
                  >
                    Log out
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <a
            href="/login"
            className="text-[12px] font-medium flex items-center gap-[8px]"
          >
            <img className="w-[20px]" src="./User.svg" alt="User icon" />
            Log in
          </a>
        )}
      </div>
      {showCartBar && <CartSideBar setShowCartBar={setShowCartBar} />}
    </div>
  );
}

export default Navbar;
