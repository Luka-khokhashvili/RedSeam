import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [formBody, setFormBody] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormBody({ ...formBody, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex h-[calc(100vh-80px)]">
      <img src="./Banner.png" alt="Auth Banner" className="w-[948px]" />
      <div className="flex w-[972px] justify-center items-center">
        <div className="flex w-[554px] flex-col">
          <h1 className="text-[42px] text-[#10151F] font-semibold pb-[48px]">
            Log in
          </h1>
          <form className="flex w-full flex-col">
            <div className="flex flex-col gap-[24px]">
              <div className="w-full">
                <div className="relative w-full">
                  <input
                    type="email"
                    name="email"
                    value={formBody.email}
                    onChange={handleChange}
                    className={`w-full px-[12px] py-[10.5px] border ${
                      errors.email ? "border-[#FF4000]" : "border-[#E1DFE1]"
                    } focus:border-[#10151F] rounded peer focus:outline-none placeholder-transparent`}
                    required
                  />
                  {!formBody.email && (
                    <span className="absolute left-[12px] top-1/2 -translate-y-1/2 text-[14px] text-[#3E424A] pointer-events-none">
                      Email <span className="text-[#FF4000]">*</span>
                    </span>
                  )}
                </div>
                {errors.email && (
                  <p className="text-red-500 text-[10px] font-light mt-1">
                    {errors.email}
                  </p>
                )}
              </div>
              <div className="w-full">
                <div className="relative w-full">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formBody.password}
                    onChange={handleChange}
                    className={`w-full px-[12px] py-[10.5px] border ${
                      errors.password ? "border-[#FF4000]" : "border-[#E1DFE1]"
                    } focus:border-[#10151F] rounded peer focus:outline-none placeholder-transparent`}
                    required
                  />
                  {!formBody.password && (
                    <span className="absolute left-[12px] top-1/2 -translate-y-1/2 text-[14px] text-[#3E424A] pointer-events-none">
                      Password <span className="text-[#FF4000]">*</span>
                    </span>
                  )}
                  <img
                    src={!showPassword ? "./Eye.svg" : "./EyeSlash.svg"}
                    alt="Show password"
                    onClick={() => {
                      setShowPassword((prev) => !prev);
                    }}
                    className="absolute right-[12px] top-[13.5px] w-[20px] cursor-pointer"
                  />
                </div>
                {errors.password && (
                  <p className="text-red-500 text-[10px] font-light mt-1">
                    {errors.password}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="flex w-full justify-center items-center text-[14px] text-white bg-[#FF4000] rounded-[10px] mt-[46px] px-[20px] py-[10px] cursor-pointer"
              >
                Register
              </button>
            </div>
          </form>
          <div className="flex w-fll pt-[24px] justify-center items-center">
            <p className="text-[14px] text-[#3E424A]">
              Already member?{" "}
              <a href="/login" className="text-[#FF4000]">
                Log in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
