import React, { useRef, useState } from "react";
import { registerUser } from "../api/services/registerUser";
import { useNavigate } from "react-router-dom";
import { validateForm } from "../utils/validateForm";
import { registerSchema } from "../schemas/authSchema";

function Register() {
  const navigate = useNavigate();
  const [formBody, setFormBody] = useState<{
    email: string;
    password: string;
    password_confirmation: string;
    username: string;
  }>({
    email: "",
    password: "",
    password_confirmation: "",
    username: "",
  });
  const [errors, setErrors] = useState<{
    username?: string;
    email?: string;
    password?: string;
    password_confirmation?: string;
  }>({});

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | undefined>(
    undefined
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { isValid, validationErrors } = validateForm(
      formBody,
      registerSchema
    );
    setErrors(validationErrors);

    if (!isValid) return;

    try {
      const data = await registerUser({
        ...formBody,
        avatar: avatarPreview || null,
      });
      console.log("User registered successfully", data);

      localStorage.setItem("token", data.token);

      setErrors({});

      navigate("/");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response?.data?.errors) {
        const backendErrors = error.response.data.errors;
        const formattedErrors: typeof errors = {};

        if (backendErrors.username)
          formattedErrors.username = backendErrors.username[0];
        if (backendErrors.email) formattedErrors.email = backendErrors.email[0];
        if (backendErrors.password)
          formattedErrors.password = backendErrors.password[0];
        if (backendErrors.password_confirmation)
          formattedErrors.password_confirmation =
            backendErrors.password_confirmation[0];

        setErrors(formattedErrors);
      } else {
        console.log("Unexpected error:", error);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormBody({ ...formBody, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatar(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleRemove = () => {
    if (avatar) {
      setAvatar(null);
    }
  };

  const handleFileInput = () => {
    if (fileInputRef && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="flex h-[calc(100vh-80px)]">
      <img src="./Banner.png" alt="Auth Banner" className="w-[948px]" />
      <div className="flex w-[972px] justify-center items-center">
        <div className="flex w-[554px] flex-col">
          <h1 className="text-[42px] text-[#10151F] font-semibold pb-[48px]">
            Registration
          </h1>
          <form onSubmit={handleSubmit} className="flex w-full flex-col">
            <div>
              {avatar ? (
                <div className="flex items-center gap-[15px] pb-[46px]">
                  <img
                    src={avatarPreview}
                    alt="Avatar preview"
                    className="w-[100px] aspect-square object-cover rounded-[50%]"
                  />
                  <button
                    type="button"
                    onClick={handleFileInput}
                    className="text-[14px] text-[#3E424A] cursor-pointer"
                  >
                    Upload new
                  </button>
                  <button
                    type="button"
                    onClick={handleRemove}
                    className="text-[14px] text-[#3E424A] cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-[15px] pb-[46px]">
                  <img
                    src="./Camera.svg"
                    alt="Camera"
                    onClick={handleFileInput}
                    className="p-[40px] rounded-[50%] border border-[#E1DFE1] cursor-pointer"
                  />
                  <button
                    type="button"
                    onClick={handleFileInput}
                    className="text-[14px] text-[#3E424A] cursor-pointer"
                  >
                    Upload image
                  </button>
                </div>
              )}
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
            {/* Main form */}
            <div className="flex flex-col gap-[24px]">
              <div className="w-full">
                <div className="relative w-full">
                  <input
                    type="text"
                    name="username"
                    value={formBody.username}
                    onChange={handleChange}
                    className={`w-full px-[12px] py-[10.5px] border ${
                      errors.username ? "border-[#FF4000]" : "border-[#E1DFE1]"
                    } focus:border-[#10151F] rounded peer focus:outline-none placeholder-transparent`}
                    required
                  />
                  {!formBody.username && (
                    <span className="absolute left-[12px] top-1/2 -translate-y-1/2 text-[14px] text-[#3E424A] pointer-events-none">
                      Username <span className="text-[#FF4000]">*</span>
                    </span>
                  )}
                </div>
                {errors.username && (
                  <p className="text-[#FF4000] text-[10px] font-light mt-1">
                    {errors.username}
                  </p>
                )}
              </div>
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
              <div className="w-full">
                <div className="relative w-full">
                  <input
                    type={showPasswordConfirm ? "text" : "password"}
                    name="password_confirmation"
                    value={formBody.password_confirmation}
                    onChange={handleChange}
                    className={`w-full px-[12px] py-[10.5px] border ${
                      errors.password_confirmation
                        ? "border-[#FF4000]"
                        : "border-[#E1DFE1]"
                    } focus:border-[#10151F] rounded peer focus:outline-none placeholder-transparent`}
                    required
                  />
                  {!formBody.password_confirmation && (
                    <span className="absolute left-[12px] top-1/2 -translate-y-1/2 text-[14px] text-[#3E424A] pointer-events-none">
                      Confirm password <span className="text-[#FF4000]">*</span>
                    </span>
                  )}
                  <img
                    src={!showPasswordConfirm ? "./Eye.svg" : "./EyeSlash.svg"}
                    alt="Show password"
                    onClick={() => {
                      setShowPasswordConfirm((prev) => !prev);
                    }}
                    className="absolute right-[12px] top-[13.5px] w-[20px] cursor-pointer"
                  />
                </div>
                {errors.password_confirmation && (
                  <p className="text-red-500 text-[10px] font-light mt-1">
                    {errors.password_confirmation}
                  </p>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="flex w-full justify-center items-center text-[14px] text-white bg-[#FF4000] rounded-[10px] mt-[46px] px-[20px] py-[10px] cursor-pointer"
            >
              Register
            </button>
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
