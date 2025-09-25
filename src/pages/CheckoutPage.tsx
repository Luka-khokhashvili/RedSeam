import { useEffect, useState } from "react";
import {
  checkout,
  deleteCartProduct,
  getCart,
  patchCartProduct,
} from "../api/services/cartService";
import type { Cart, CartDeleteBody, CartPatchBody } from "../interfaces/cart";
import { Link } from "react-router-dom";
import CheckoutSuccess from "../components/CheckoutSuccess";
const calcSubtotal = (products: Cart[]) =>
  products.reduce(
    (sum, product) => sum + product.total_price * product.quantity,
    0
  );

const delivery = 5;

function CheckoutPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [products, setProducts] = useState<Cart[]>([]);
  const email = localStorage.getItem("email");
  const [formBody, setFormBody] = useState<{
    name: string;
    surname: string;
    email: string;
    address: string;
    zip_code: string;
  }>({
    name: "",
    surname: "",
    email: "",
    address: "",
    zip_code: "",
  });
  const [errors, setErrors] = useState<{
    name?: string;
    surname?: string;
    email?: string;
    address?: string;
    zip_code?: string;
  }>({});

  useEffect(() => {
    getCart().then((res) => setProducts(res));

    setFormBody((prev) => ({ ...prev, email: email ?? "" }));
  }, [email]);

  const validateForm = () => {
    const newErrors: typeof errors = {};

    if (!formBody.name) newErrors.name = "Name is required";
    else if (formBody.name.length < 3)
      newErrors.name = "Name must be at least 3 characters";
    if (!formBody.surname) newErrors.surname = "Surname is required";
    else if (formBody.surname.length < 3)
      newErrors.surname = "Surname must be at least 3 characters";

    if (!formBody.email) newErrors.email = "Email is required";
    else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formBody.email))
      newErrors.email = "Invalid email format";

    if (!formBody.address) newErrors.address = "Address is required";
    if (!formBody.zip_code) newErrors.zip_code = "Zip_code is required";

    return Object.keys(newErrors).length === 0;
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const data = await checkout({ ...formBody });
      console.log("Checkout was successful!", data);

      setModalOpen(true);

      setErrors({});

      setProducts([]);
      setFormBody({
        name: "",
        surname: "",
        email: email ?? "",
        address: "",
        zip_code: "",
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response?.data?.errors) {
        const backendErrors = error.response.data.errors;
        const formattedErrors: typeof errors = {};

        if (backendErrors.name) formattedErrors.name = backendErrors.name[0];
        if (backendErrors.surname)
          formattedErrors.surname = backendErrors.surname[0];
        if (backendErrors.email) formattedErrors.email = backendErrors.email[0];
        if (backendErrors.address)
          formattedErrors.address = backendErrors.address[0];
        if (backendErrors.zip_code)
          formattedErrors.zip_code = backendErrors.zip_code[0];

        setErrors(formattedErrors);
      } else {
        console.log("Unexpected error:", error);
      }
    }
  };

  const handleQuantityChange = async (product: Cart, newQuantity: number) => {
    try {
      const patchBody: CartPatchBody = {
        quantity: newQuantity,
        color: product.color,
        size: product.size,
      };

      setProducts((prev) =>
        prev.map((p) =>
          p.id === product.id &&
          p.color === product.color &&
          p.size === product.size
            ? { ...p, quantity: newQuantity }
            : p
        )
      );

      await patchCartProduct(product.id, patchBody);
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

  const subtotal = calcSubtotal(products);
  const total = subtotal + delivery;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormBody({ ...formBody, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col w-full mt-[72px] gap-[42px] px-[100px]">
      {modalOpen && <CheckoutSuccess setModalOpen={setModalOpen} />}
      <h1 className="text-[42px] text-[#10151F] font-semibold">Checkout</h1>
      <div className="flex flex-col lg:flex-row w-full gap-[131px] h-[635px]">
        {/* Form */}
        <div className="flex flex-col w-full lg:w-[1129px] h-full gap-[46px] px-[47px] py-[72px] bg-[#F8F6F7] rounded-[16px]">
          <h3 className="text-[22px] text-[#3E424A] font-medium">
            Order details
          </h3>
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
                      onChange={handleChange}
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
                      onChange={handleChange}
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
                    onChange={handleChange}
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
                      onChange={handleChange}
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
                      onChange={handleChange}
                      className={`w-full px-[12px] py-[10.5px] bg-white border ${
                        errors.zip_code
                          ? "border-[#FF4000]"
                          : "border-[#E1DFE1]"
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
        {/* Details */}
        <div className="flex flex-col w-full lg:w-[460px] h-full">
          <div className="flex flex-col h-full gap-[81px]">
            {products.length <= 0 ? (
              <div className="flex flex-col w-full pt-[150px] justify-center items-center">
                <img src="/CartRed.svg" alt="Cart" />
                <h2 className="text-[24px] text-[#10151F] font-semibold mt-[24px]">
                  Ooops!
                </h2>
                <p className="text-[14px] text-[#3E424A] mt-[10px]">
                  You’ve got nothing in your cart just yet...
                </p>
                <Link
                  to={"/"}
                  className="flex w-[214px] items-center justify-center text-[14px] text-white mt-[58px] py-[10px] bg-[#FF4000] rounded-[10px] cursor-pointer"
                >
                  Start shopping
                </Link>
              </div>
            ) : (
              <>
                <div
                  className="flex-1 overflow-y-auto pr-2"
                  style={{ scrollbarColor: "#FF4000 transparent" }}
                >
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
                              <p className="cursor-default">
                                {product.quantity}
                              </p>
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

            <div>
              {products.length > 0 && (
                <button
                  type="submit"
                  form="checkoutForm"
                  className="flex w-full justify-center items-center py-[16px] bg-[#FF4000] text-white rounded-[10px] cursor-pointer"
                >
                  Pay
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
