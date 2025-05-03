import { Trash } from "lucide-react";

function SocialMediaDeleteBtn() {
  const deleteSocialMedia = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };
  return (
    <Trash
      onClick={deleteSocialMedia}
      className="w-4 h-4 absolute top-2 left-2 md:top-3 md:left-3 opacity-100 md:opacity-0 transform scale-90 hover:scale-140 hover:text-red-400 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100"
    />
  );
}

export default SocialMediaDeleteBtn;
