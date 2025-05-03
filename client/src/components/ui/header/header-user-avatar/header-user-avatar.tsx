import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserIcon, Users, Plus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // make sure this path is correct
import { Link } from "react-router-dom";

import UserLogoutBut from "@/components/user/user-logout-button";

type User = {
  id: string;
  fullname: string;
  email: string;
  profile_image?: string | null;
};

interface HeaderUserAvatarProps {
  user: User;
}

const HeaderUserAvatar: React.FC<HeaderUserAvatarProps> = ({ user }) => {
  const { fullname, email, profile_image } = user;
  const firstLetterOfUsername = fullname?.trim().charAt(0).toUpperCase();
  return (
    <div className="ml-3 md:ml-0">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center gap-2 cursor-pointer">
            <Avatar className="cursor-pointer w-10 h-10 border border-gray-200">
              <AvatarImage
                sizes="4"
                src={`${
                  import.meta.env.VITE_SERVER_BASE_URL
                }/images/uploads/user-profiles/${profile_image}`}
                alt="User"
                className="object-cover"
              />
              <AvatarFallback className="text-muted-foreground">
                {firstLetterOfUsername}
              </AvatarFallback>
            </Avatar>
            <div className="hidden md:flex md:flex-col">
              <h4 className="text-xs font-semibold">{fullname}</h4>
              <p className="text-[10px] text-gray-400">{email}</p>
            </div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="border border-gray-200">
          <DropdownMenuLabel>
            <div className="flex flex-col md:hidden">
              <h4 className="text-xs font-semibold">{fullname}</h4>
              <p className="text-[10px] text-gray-400">{email}</p>
            </div>
            <span className="hidden md:flex"> My Account</span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Link to="/my-account">
            <DropdownMenuItem>
              <UserIcon className="mr-2 h-4 w-4" />
              Account
            </DropdownMenuItem>
          </Link>
          <Link to="/add-influencer">
            <DropdownMenuItem>
              <Plus className="mr-2 h-4 w-4" />
              Add Influencer
            </DropdownMenuItem>
          </Link>
          <Link to="/manage-influencers">
            <DropdownMenuItem>
              <Users className="mr-2 h-4 w-4" />
              Manage Influencers
            </DropdownMenuItem>
          </Link>
          <UserLogoutBut />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default HeaderUserAvatar;
