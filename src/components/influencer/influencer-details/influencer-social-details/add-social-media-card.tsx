import { Plus } from "lucide-react";

function AddSocialMediaCard() {
  return (
    <div className="w-full py-5 md:py-0 md:w-1/2 flex flex-col items-center justify-center gap-2 transition duration-300 text-gray-200 hover:text-gray-500 hover:shadow-md rounded-xl border border-gray-200 cursor-pointer">
      <Plus className="w-8 h-8" strokeWidth={3} />
      {/* <h1 className="text-md font-semibold">Add New</h1> */}
    </div>
  );
}

export default AddSocialMediaCard;
