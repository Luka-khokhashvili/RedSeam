export const handleFileChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  setAvatar: React.Dispatch<React.SetStateAction<File | null>>,
  setAvatarPreview: React.Dispatch<React.SetStateAction<string | undefined>>
) => {
  if (e.target.files && e.target.files[0]) {
    const file = e.target.files[0];
    setAvatar(file);
    setAvatarPreview(URL.createObjectURL(file));
  }
};

export const handleRemove = (
  avatar: File | null,
  setAvatar: React.Dispatch<React.SetStateAction<File | null>>,
  fileInputRef?: React.RefObject<HTMLInputElement | null>
) => {
  if (avatar) {
    setAvatar(null);
  }

  if (fileInputRef?.current) {
    fileInputRef.current.value = "";
  }
};

export const handleFileInput = (
  fileInputRef: React.RefObject<HTMLDivElement | null>
) => {
  if (fileInputRef && fileInputRef.current) {
    fileInputRef.current.click();
  }
};
