import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

interface ProfileImageProps {
  style: string; // supports both numbers and Tailwind strings like "10"
  fullname: string | undefined;
  src: string | File | undefined | null;
  isInfluencer: boolean | undefined;
  isUser: boolean | undefined;
  backgroundColor?: string; // expects Tailwind-friendly colors like "gray-200"
}

export function ProfileImage({
  style,
  fullname,
  src,
  isInfluencer,
  isUser,
  backgroundColor,
}: ProfileImageProps) {
  const imageDir = isInfluencer
    ? "influencer-profiles"
    : isUser
    ? "user-profiles"
    : undefined;

  const profileImage = `${
    import.meta.env.VITE_SERVER_BASE_URL
  }/images/uploads/${imageDir}/${src}`;

  const firstLetterOfUsername = fullname?.trim().charAt(0).toUpperCase();
  return (
    <Avatar className={`cursor-pointer ${style}`}>
      <AvatarImage
        src={
          src?.startsWith("blob:")
            ? src // show preview image
            : profileImage // fallback to server image
        }
        className="object-cover"
        alt={fullname}
      />
      <AvatarFallback
        className={`${backgroundColor || "bg-gray-300"} text-muted-foreground`}
      >
        {firstLetterOfUsername}
      </AvatarFallback>
    </Avatar>
  );
}
