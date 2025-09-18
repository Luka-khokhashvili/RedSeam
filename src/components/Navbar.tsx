function Navbar() {
  return (
    <div className="w-full flex justify-between items-center px-[100px] py-[28px]">
      <a href="" className="flex gap-[7.75px]">
        <img className="h-[21px]" src="./Logo.svg" alt="ReadSeam Logo" />
        <h3 className="text-[16px] font-semibold">RedSeam Clothing</h3>
      </a>
      <div className="flex">
        <a
          href=""
          className="text-[12px] font-medium flex items-center gap-[8px]"
        >
          <img className="w-[20px]" src="./User.svg" alt="User icon" />
          Log in
        </a>
      </div>
    </div>
  );
}

export default Navbar;
