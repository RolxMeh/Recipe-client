import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

import Image from "next/image";

import { userIdHook } from "@/hookState/userIdHook";

const SavedRecipes = () => {
  const [recipes, setRecipes] = useState<any>([{}]);
  const [cookies, setCookies] = useCookies(["access_token"]);

  const userId = userIdHook();

  useEffect(() => {
    try {
      const fetchSavedRecipes = async () => {
        const response = await axios.get(
          `https://recipe-server-fypv.onrender.comrecipes/savedRecipes/${userId}`,
          {
            headers: {
              authorization: cookies.access_token,
            },
          }
        );

        setRecipes(response.data.savedRecipes);
      };

      fetchSavedRecipes();
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <div className="w-full h-full pt-5 bg-slate-900 flex flex-col justify-center items-center">
      <h1 className="text-3xl">Recipes</h1>
      <>
        {recipes.map((recipe) => {
          return (
            <div
              key={recipe._id}
              className="w-96 h-auto my-2 px-3 border border-slate-600"
            >
              <div className="my-2 flex justify-between">
                <h2 className="text-xl ">{recipe.name}</h2>
              </div>
              <img
                src={recipe.imageUrl}
                alt={recipe.name}
                className="object-contain rounded-md"
              />
              <div className="mt-3">
                {recipe.ingredients?.map((ingredient, index) => (
                  <li key={index} className="text-sm">
                    {ingredient}
                  </li>
                ))}
              </div>
              <h4 className=" mt-2 text-base">{recipe.instruction}</h4>
              <h4 className="mt-2 text-sm">{recipe.cookingTime} minutes</h4>
            </div>
          );
        })}
      </>
    </div>
  );
};

export default SavedRecipes;
