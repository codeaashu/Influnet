import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useAuth } from "@/hooks/use-auth";
import { ChevronsUpDown, LogOut } from "lucide-react";

function InluencerManagementSidebarFooter() {
  const { user, logout } = useAuth();
  const firstLetterOfUsername = user?.fullname?.trim().charAt(0).toUpperCase();
  return (
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger className="bg-gray-100 p-2 rounded-md" asChild>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 cursor-pointer">
                  <Avatar className="cursor-pointer w-10 h-10 border border-gray-200">
                    <AvatarImage
                      sizes="4"
                      src={`${
                        import.meta.env.VITE_SERVER_BASE_URL
                      }/images/uploads/user-profiles/${user?.profile_image}`}
                      alt="User"
                      className="object-cover"
                    />
                    <AvatarFallback className="text-muted-foreground">
                      {firstLetterOfUsername}
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden md:flex md:flex-col">
                    <h4 className="text-xs font-semibold">{user?.fullname}</h4>
                    <p className="text-[10px] text-gray-400">{user?.email}</p>
                  </div>
                </div>
                <ChevronsUpDown className="w-4 h-4" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="top" className="">
              <DropdownMenuItem onClick={logout}>
                <LogOut />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
}

export default InluencerManagementSidebarFooter;
