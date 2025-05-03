"use client";

import SearchBar from "@/components/search/search-bar";
import Logo from "../logo/logo";
import HeaderUserAvatar from "./header-user-avatar/header-user-avatar";
import { Button } from "../button";
import { Plus, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import HeaderUserAvatarSkeleton from "@/components/skeletons/user/header-user-avatar-skeleton";

function Header() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { user, userLoading } = useAuth();

  const navigateToJoinInfluencrInPage = () => {
    setOpen(false);
    navigate("/join-influencrin");
  };

  const navigateToLoginPage = () => {
    setOpen(false);
    navigate("/login");
  };

  return (
    <div className="z-50 flex items-center justify-between gap-0 md:gap-2 shadow-xs px-2 md:px-20 py-3 md:py-4">
      <Logo />

      <SearchBar />
      {userLoading && <HeaderUserAvatarSkeleton />}
      {user && <HeaderUserAvatar user={user} />}

      {/* Desktop actions */}

      {!userLoading && !user && (
        <div className="hidden md:flex items-center gap-3">
          <Link to="/join-influencrin">
            {" "}
            <Button>Join InfluencrIn</Button>
          </Link>

          <Link to="/login">
            <Button>Log in</Button>
          </Link>
        </div>
      )}

      {/* Mobile menu */}
      {!user && (
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" className="pr-0 !important">
                <Menu
                  style={{ height: "20px", width: "20px" }}
                  className="text-primary"
                  strokeWidth={2.5}
                />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[260px] px-4 py-6">
              <div className="flex flex-col gap-3 mt-8">
                <Button
                  variant="default"
                  onClick={navigateToJoinInfluencrInPage}
                >
                  Join InfluencrIn
                </Button>

                <Button onClick={navigateToLoginPage}>Log in</Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      )}
    </div>
  );
}

export default Header;
