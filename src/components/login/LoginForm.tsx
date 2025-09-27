import handleChange from "../../utils/handleChange";

interface LoginFormProps {
  formBody: {
    email: string;
    password: string;
  };
  setFormBody: React.Dispatch<
    React.SetStateAction<{
      email: string;
      password: string;
    }>
  >;
  errors: {
    email?: string;
    password?: string;
  };
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
}

function LoginForm({
  formBody,
  setFormBody,
  errors,
  handleSubmit,
  showPassword,
  setShowPassword,
}: LoginFormProps) {
  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col">
      <div className="flex flex-col gap-[24px]">
        <div className="w-full">
          <div className="relative w-full">
            <input
              type="email"
              name="email"
              value={formBody.email}
              onChange={(e) => {
                handleChange(e, formBody, setFormBody);
              }}
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
              onChange={(e) => {
                handleChange(e, formBody, setFormBody);
              }}
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
          Log in
        </button>
      </div>
    </form>
  );
}

export default LoginForm;
