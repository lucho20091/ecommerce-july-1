import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import * as ROUTES from "../constants/routes";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";
import { toast } from "react-toastify";
export default function MainNavbar() {
  const [openNav, setOpenNav] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { user, isAuthenticated, loading } = useContext(AuthContext);
  useEffect(() => {
    if (user && isAuthenticated) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [user]);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const handleOpenDialog = () => {
    setOpenDialog((prev) => !prev);
  };

  const handleLogout = async () => {
    setOpenDialog(false);
    try {
      const response = await fetch("http://localhost:3000/api/users/logout", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.ok) {
        setIsLoggedIn(false);
        window.location.reload();
        toast.success(data.message || "Logged out successfully");
      }
    } catch (error) {
      toast.error("Failed to logout");
    }
  };

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Link
          to={ROUTES.PRODUCTS}
          className="flex items-center"
          onClick={() => setOpenNav(false)}
        >
          Products
        </Link>
      </Typography>
    </ul>
  );

  return (
    <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4">
      <div className="flex items-center justify-between text-blue-gray-900">
        <Link
          to={ROUTES.HOME}
          className="mr-4 cursor-pointer py-1.5 font-medium"
        >
          Ecommerce July 2025
        </Link>
        <div className="flex items-center gap-4">
          <div className="mr-4 hidden lg:block">{navList}</div>
          <div className="flex items-center gap-x-1">
            {isLoggedIn ? (
              <div className="flex items-center gap-x-4">
                <Link
                  to={`/profile/${user?.id}`}
                  className="hidden lg:inline-block"
                >
                  {user.name}
                </Link>
                <Button
                  color="red"
                  variant="gradient"
                  size="sm"
                  onClick={handleOpenDialog}
                  className="hidden lg:inline-block"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <>
                <Link to={ROUTES.LOGIN} className="hidden lg:inline-block">
                  <Button variant="text" size="sm">
                    <span>Log In</span>
                  </Button>
                </Link>
                <Link to={ROUTES.REGISTER} className="hidden lg:inline-block">
                  <Button variant="gradient" size="sm">
                    <span>Register</span>
                  </Button>
                </Link>
              </>
            )}
          </div>
          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </IconButton>
        </div>
      </div>
      <MobileNav open={openNav}>
        {navList}
        <div className="flex items-center gap-x-1">
          {isLoggedIn ? (
            <Button
              color="red"
              variant="gradient"
              size="sm"
              onClick={handleOpenDialog}
              className="w-1/2 ml-auto"
            >
              Logout
            </Button>
          ) : (
            <>
              <Link to={ROUTES.LOGIN} className="w-full">
                <Button
                  fullWidth
                  variant="text"
                  size="sm"
                  className=""
                  onClick={() => setOpenNav(false)}
                >
                  <span>Log In</span>
                </Button>
              </Link>
              <Link to={ROUTES.REGISTER} className="w-full">
                <Button
                  fullWidth
                  variant="gradient"
                  size="sm"
                  className=""
                  onClick={() => setOpenNav(false)}
                >
                  <span>Sign in</span>
                </Button>
              </Link>
            </>
          )}
        </div>
      </MobileNav>
      <Dialog open={openDialog} handler={handleOpenDialog}>
        <DialogHeader>Are you sure you want to logout?</DialogHeader>
        <DialogFooter>
          <Button
            variant="text"
            color="blue-gray"
            onClick={handleOpenDialog}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="red" onClick={handleLogout}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </Navbar>
  );
}
