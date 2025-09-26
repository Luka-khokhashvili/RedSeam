import { useRef } from "react";
import type { RegisterBody } from "../../interfaces/auth";
import handleChange from "../../utils/handleChange";
import {
  handleFileChange,
  handleFileInput,
  handleRemove,
} from "../../utils/handleFile";

interface RegisterFormProps {
  formBody: RegisterBody;
  setFormBody: React.Dispatch<React.SetStateAction<RegisterBody>>;
  errors: {
    username?: string;
    email?: string;
    password?: string;
    password_confirmation?: string;
  };
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
  showPasswordConfirm: boolean;
  setShowPasswordConfirm: React.Dispatch<React.SetStateAction<boolean>>;
  avatar: File | null;
  setAvatar: React.Dispatch<React.SetStateAction<File | null>>;
  avatarPreview: string | undefined;
  setAvatarPreview: React.Dispatch<React.SetStateAction<string | undefined>>;
}

function RegistrationFrom({
  formBody,
  setFormBody,
  errors,
  handleSubmit,
  showPassword,
  setShowPassword,
  showPasswordConfirm,
  setShowPasswordConfirm,
  avatar,
  setAvatar,
  avatarPreview,
  setAvatarPreview,
}: RegisterFormProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  return (
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
              onClick={() => handleFileInput(fileInputRef)}
              className="text-[14px] text-[#3E424A] cursor-pointer"
            >
              Upload new
            </button>
            <button
              type="button"
              onClick={() => handleRemove(avatar, setAvatar)}
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
              onClick={() => handleFileInput(fileInputRef)}
              className="p-[40px] rounded-[50%] border border-[#E1DFE1] cursor-pointer"
            />
            <button
              type="button"
              onClick={() => handleFileInput(fileInputRef)}
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
          onChange={(e) => handleFileChange(e, setAvatar, setAvatarPreview)}
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
              onChange={(e) => handleChange(e, formBody, setFormBody)}
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
              onChange={(e) => handleChange(e, formBody, setFormBody)}
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
              onChange={(e) => handleChange(e, formBody, setFormBody)}
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
              onChange={(e) => handleChange(e, formBody, setFormBody)}
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
  );
}

export default RegistrationFrom;
