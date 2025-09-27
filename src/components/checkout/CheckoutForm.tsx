import handleChange from "../../utils/handleChange";

interface CheckoutFormProps {
  formBody: {
    name: string;
    surname: string;
    email: string;
    address: string;
    zip_code: string;
    [key: string]: string;
  };
  setFormBody: React.Dispatch<
    React.SetStateAction<{
      name: string;
      surname: string;
      email: string;
      address: string;
      zip_code: string;
      [key: string]: string;
    }>
  >;
  errors: {
    name?: string;
    surname?: string;
    email?: string;
    address?: string;
    zip_code?: string;
    [key: string]: string | undefined;
  };
  handleCheckout: (e: React.FormEvent<HTMLFormElement>) => void;
}

function CheckoutForm({
  formBody,
  setFormBody,
  errors,
  handleCheckout,
}: CheckoutFormProps) {
  return (
    <div className="flex flex-col w-full lg:w-[1129px] h-full gap-[46px] px-[47px] py-[72px] bg-[#F8F6F7] rounded-[16px]">
      <h3 className="text-[22px] text-[#3E424A] font-medium">Order details</h3>
      <form
        id="checkoutForm"
        onSubmit={handleCheckout}
        className="flex w-[578px] flex-col"
      >
        <div className="flex flex-col gap-[24px]">
          <div className="flex gap-[24px]">
            <div className="w-full">
              <div className="relative w-full">
                <input
                  type="text"
                  name="name"
                  value={formBody.name}
                  onChange={(e) => {
                    handleChange(e, formBody, setFormBody);
                  }}
                  className={`w-full px-[12px] py-[10.5px] bg-white border ${
                    errors.name ? "border-[#FF4000]" : "border-[#E1DFE1]"
                  } focus:border-[#10151F] rounded-[8px] peer focus:outline-none placeholder-transparent`}
                  required
                />
                {!formBody.name && (
                  <span className="absolute left-[12px] top-1/2 -translate-y-1/2 text-[14px] text-[#3E424A] pointer-events-none">
                    Name <span className="text-[#FF4000]">*</span>
                  </span>
                )}
              </div>
              {errors.name && (
                <p className="text-red-500 text-[10px] font-light mt-1">
                  {errors.name}
                </p>
              )}
            </div>
            <div className="w-full">
              <div className="relative w-full">
                <input
                  type="text"
                  name="surname"
                  value={formBody.surname}
                  onChange={(e) => {
                    handleChange(e, formBody, setFormBody);
                  }}
                  className={`w-full px-[12px] py-[10.5px] bg-white border ${
                    errors.surname ? "border-[#FF4000]" : "border-[#E1DFE1]"
                  } focus:border-[#10151F] rounded-[8px] peer focus:outline-none placeholder-transparent`}
                  required
                />
                {!formBody.surname && (
                  <span className="absolute left-[12px] top-1/2 -translate-y-1/2 text-[14px] text-[#3E424A] pointer-events-none">
                    Surname <span className="text-[#FF4000]">*</span>
                  </span>
                )}
              </div>
              {errors.surname && (
                <p className="text-red-500 text-[10px] font-light mt-1">
                  {errors.surname}
                </p>
              )}
            </div>
          </div>
          <div className="w-full">
            <div className="relative w-full">
              <input
                type="email"
                name="email"
                value={formBody.email}
                onChange={(e) => {
                  handleChange(e, formBody, setFormBody);
                }}
                className={`w-full px-[12px] py-[10.5px] bg-white border ${
                  errors.email ? "border-[#FF4000]" : "border-[#E1DFE1]"
                } focus:border-[#10151F] rounded-[8px] peer focus:outline-none placeholder-transparent`}
                required
              />
              {!formBody.email && (
                <span className="absolute flex gap-[5.87px] left-[12px] top-1/2 -translate-y-1/2 text-[14px] text-[#3E424A] pointer-events-none">
                  <img src="/Email.svg" alt="Email" />
                  <span>
                    Email <span className="text-[#FF4000]">*</span>
                  </span>
                </span>
              )}
            </div>
            {errors.email && (
              <p className="text-red-500 text-[10px] font-light mt-1">
                {errors.email}
              </p>
            )}
          </div>
          <div className="flex gap-[24px]">
            <div className="w-full">
              <div className="relative w-full">
                <input
                  type="text"
                  name="address"
                  value={formBody.address}
                  onChange={(e) => {
                    handleChange(e, formBody, setFormBody);
                  }}
                  className={`w-full px-[12px] py-[10.5px] bg-white border ${
                    errors.address ? "border-[#FF4000]" : "border-[#E1DFE1]"
                  } focus:border-[#10151F] rounded-[8px] peer focus:outline-none placeholder-transparent`}
                  required
                />
                {!formBody.address && (
                  <span className="absolute flex gap-[5.87px] left-[12px] top-1/2 -translate-y-1/2 text-[14px] text-[#3E424A] pointer-events-none">
                    address <span className="text-[#FF4000]">*</span>
                  </span>
                )}
              </div>
              {errors.address && (
                <p className="text-red-500 text-[10px] font-light mt-1">
                  {errors.address}
                </p>
              )}
            </div>
            <div className="w-full">
              <div className="relative w-full">
                <input
                  type="text"
                  name="zip_code"
                  value={formBody.zip_code}
                  onChange={(e) => {
                    handleChange(e, formBody, setFormBody);
                  }}
                  className={`w-full px-[12px] py-[10.5px] bg-white border ${
                    errors.zip_code ? "border-[#FF4000]" : "border-[#E1DFE1]"
                  } focus:border-[#10151F] rounded-[8px] peer focus:outline-none placeholder-transparent`}
                  required
                />
                {!formBody.zip_code && (
                  <span className="absolute flex gap-[5.87px] left-[12px] top-1/2 -translate-y-1/2 text-[14px] text-[#3E424A] pointer-events-none">
                    zip_code <span className="text-[#FF4000]">*</span>
                  </span>
                )}
              </div>
              {errors.zip_code && (
                <p className="text-red-500 text-[10px] font-light mt-1">
                  {errors.zip_code}
                </p>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CheckoutForm;
