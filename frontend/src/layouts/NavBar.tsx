import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { LogIn, LogOut, Menu, User, UserPlus } from "lucide-react";
import { logout } from "@/store/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import Settings from "@/components/Settings";
import SelectLanguage from "@/components/SelectLanguage";
import { ModeToggle } from "@/components/mode-toggle";

const NavBar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, token } = useSelector((state: RootState) => state.auth);

  const handleLogout = async () => {
    await dispatch(logout());
  };

  return (
    <nav className="bg-white shadow-md border border-b-gray-300 dark:bg-black dark:border-b-white/25">
      {user && token && <Settings />}
      <div className="max-w-7xl  mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="font-bold text-xl text-primary">
              Logo
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
              {user && token ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost">
                      <User className="mr-2 h-5 w-5" />
                      {user.userName}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <Link to={"/profile"}>
                      <DropdownMenuItem className="cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem
                      onSelect={handleLogout}
                      className="cursor-pointer"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <Link to={"/login"} className="cursor-pointer">
                    <Button variant="ghost">
                      <LogIn className="mr-2 h-4 w-4" />
                      Log in
                    </Button>
                  </Link>
                  <Link to={"/signup"} className="cursor-pointer">
                    <Button>
                      <UserPlus className="mr-2 h-4 w-4" />
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
            </div>
            <div className="flex items-center sm:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <span className="sr-only">Open menu</span>
                    <Menu className="h-6 w-6" aria-hidden="true" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {user && token ? (
                    <>
                      <Link to={"/profile"}>
                        <DropdownMenuItem className="cursor-pointer">
                          <User className="mr-2 h-4 w-4" />
                          Profile
                        </DropdownMenuItem>
                      </Link>
                      <DropdownMenuItem
                        onSelect={handleLogout}
                        className="cursor-pointer"
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                      </DropdownMenuItem>
                    </>
                  ) : (
                    <>
                      <Link to={"/login"}>
                        <DropdownMenuItem className="cursor-pointer">
                          <LogIn className="mr-2 h-4 w-4" />
                          Login
                        </DropdownMenuItem>
                      </Link>
                      <Link to={"/signup"}>
                        <DropdownMenuItem className="cursor-pointer">
                          <UserPlus className="mr-2 h-4 w-4" />
                          Sign Up
                        </DropdownMenuItem>
                      </Link>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <ModeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
