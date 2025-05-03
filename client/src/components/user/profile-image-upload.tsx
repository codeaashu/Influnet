import { useRef, useState } from "react";
import { Label } from "@/components/ui/label";
import { ProfileImage } from "@/components/ui/profile-image";
import { UploadIcon, User } from "lucide-react";

export function ProfileImageUpload({
  style,
  defaultName,
  defaultImage,
  onImageSelect,
  isUser,
  isInfluencer,
}: {
  style: string;
  defaultName: string | undefined;
  defaultImage: string | File | null | undefined;
  onImageSelect: (file: File) => void;
  isUser: boolean | undefined;
  isInfluencer: boolean | undefined;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<
    string | File | null | undefined
  >(defaultImage);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file); // 👈 this line creates a temp preview
      setPreviewUrl(imageUrl);
      onImageSelect(file); // send file to parent form
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mb-5">
      <div
        className={`relative group cursor-pointer ${
          style || "w-40 h-40"
        } rounded-full`}
        onClick={() => fileInputRef.current?.click()}
      >
        <ProfileImage
          isUser={isUser}
          isInfluencer={isInfluencer}
          style="w-full h-full shadow-2xl"
          fullname={defaultName}
          src={previewUrl}
          backgroundColor="bg-gray-300"
        />

        {!defaultName && !defaultImage && (
          <div
            className={`absolute inset-0 flex items-center justify-center opacity-100 group-hover:opacity-0 transition-opacity duration-200 rounded-full`}
          >
            <User className="text-gray-400 w-16 h-16" strokeWidth={1} />
          </div>
        )}

        {/* Hover overlay icon */}
        <div
          className={`absolute inset-0 bg-black/10 flex items-center justify-center  ${
            // !defaultName && !defaultImage
            // ? "opacity-100"
            // :
            "opacity-0 group-hover:opacity-100"
          }  transition-opacity duration-200 rounded-full`}
        >
          <UploadIcon className="text-gray-200 w-6 h-6" />
        </div>
      </div>
      <input
        type="file"
        accept="image/*"
        hidden
        ref={fileInputRef}
        onChange={handleImageChange}
      />

      <Label className="justify-center mt-3 text-center text-xs text-muted-foreground">
        Click to upload picture
      </Label>
    </div>
  );
}
