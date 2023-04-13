import React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { userIdHook } from "../hookState/userIdHook";

const Navbar = () => {
  {
    ssr: false;
  }
  const userId = userIdHook();

  return (
    <div className="bg-slate-800 w-full h-20 text-base flex items-center justify-center md:text-lg">
      <Link href={"/"} className="mx-3  focus:text-blue-400">
        Home
      </Link>

      {userId ? (
        <>
          <Link href={"/create-recipe"} className="mx-3 focus:text-blue-400">
            Create Recipe
          </Link>
          <Link href={"/saved-recipes"} className="mx-3 focus:text-blue-400">
            Saved Recipes
          </Link>
          <Link
            href={"/auth"}
            onClick={() => localStorage.removeItem("userId")}
            className="mx-3 focus:text-blue-400"
          >
            Logout
          </Link>
        </>
      ) : (
        <Link href={"/auth"} className="mx-3 focus:text-blue-400">
          Register/Login
        </Link>
      )}
    </div>
  );
};

export default dynamic(() => Promise.resolve(Navbar), { ssr: false });
