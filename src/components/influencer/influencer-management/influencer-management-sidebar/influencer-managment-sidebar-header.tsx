import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Logo from "@/components/ui/logo/logo";
import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ChevronsUpDown, Home, Search } from "lucide-react";

import { Link } from "react-router-dom";

function InfluencerManagmentSidebarHeader() {
  return (
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem className="pl-2 mt-3">
          <Link to="/">
            <Logo />
          </Link>

          {/* <DropdownMenu>
            <DropdownMenuTrigger
              asChild
              className="mt-3 focus-visible:ring-0 cursor-pointer select-none"
            >
              <SidebarMenuButton className="hover:bg-gray-0">
                <Logo />
                <ChevronsUpDown className="ml-auto" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[--radix-popper-anchor-width]"
              align="end"
            >
              <DropdownMenuItem>
                <Link to="/" className="flex items-center gap-2 w-full">
                  <Home className="mr-2 h-4 w-4" />
                  <p className="w-full">Home</p>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/search" className="flex items-center gap-2 w-full">
                  <Search className="flex-1 mr-2 h-4 w-4" />
                  <span className="">Search Influencers</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu> */}
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  );
}

export default InfluencerManagmentSidebarHeader;
