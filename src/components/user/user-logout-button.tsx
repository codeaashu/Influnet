import { useAuth } from "@/hooks/use-auth";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { LogOutIcon } from "lucide-react";

function UserLogoutBut() {
  const { logout } = useAuth();
  return (
    <DropdownMenuItem onClick={logout}>
      <LogOutIcon className="mr-2 h-4 w-4" />
      Log out
    </DropdownMenuItem>
  );
}

export default UserLogoutBut;
