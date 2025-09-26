import { useRef } from "react";
import {
  handleFileChange,
  handleFileInput,
  handleRemove,
} from "../../utils/handleFile";

type AvatarSectionProps = {
  avatar: File | null;
  setAvatar: React.Dispatch<React.SetStateAction<File | null>>;
  avatarPreview: string | undefined;
  setAvatarPreview: React.Dispatch<React.SetStateAction<string | undefined>>;
};

function AvatarSection({
  avatar,
  setAvatar,
  avatarPreview,
  setAvatarPreview,
}: AvatarSectionProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  return (
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
            onClick={() => handleRemove(avatar, setAvatar, fileInputRef)}
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
  );
}

export default AvatarSection;
