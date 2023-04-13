import React, { useEffect, useState } from "react";
import axios from "axios";
import dynamic from "next/dynamic";
import { useCookies } from "react-cookie";

import { userIdHook } from "@/hookState/userIdHook";

const Homepage = () => {
  const [recipes, setRecipes] = useState<any>([{}]);
  const [savedRecipes, setSavedRecipes] = useState([""]);
  const [cookies, setCookies] = useCookies(["access_token"]);

  const userId = userIdHook();

  useEffect(() => {
    try {
      const fetchRecipe = async () => {
        const response = await axios.get(
          "https://recipe-server-fypv.onrender.com/recipes"
        );
        setRecipes(response.data);
      };

      const fetchSavedRecipes = async () => {
        const response = await axios.get(
          `https://recipe-server-fypv.onrender.com/recipes/savedRecipe/${userId}`,
          {
            headers: {
              authorization: cookies.access_token,
            },
          }
        );

        setSavedRecipes(response.data.savedRecipes);
      };
      fetchRecipe();
      userId && fetchSavedRecipes();
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleSaveRecipes = async (recipeId) => {
    try {
      const response = await axios.put(
        "https://recipe-server-fypv.onrender.com/recipes/createRecipe",
        {
          userId,
          recipeId,
        },
        {
          headers: {
            authorization: cookies.access_token,
          },
        }
      );

      setSavedRecipes(response.data.savedRecipes);
    } catch (error) {
      console.error(error);
    }
  };

  const isRecipeSaved = (id) => savedRecipes?.includes(id);

  return (
    <div className="w-full h-full pt-5 bg-slate-900 flex flex-col justify-center items-center">
      <h1 className="text-3xl">Recipes</h1>
      <>
        {recipes.map((recipe) => {
          return (
            <div
              key={recipe._id}
              className="w-[94%] h-auto my-2 px-3 border border-slate-600 md:w-96"
            >
              <div className="my-2 flex justify-between">
                <h2 className="text-xl ">{recipe.name}</h2>
                {userId && (
                  <button
                    onClick={() => handleSaveRecipes(recipe._id)}
                    disabled={isRecipeSaved(recipe._id)}
                    className="bg-slate-700 w-14 h-auto px-2 rounded-sm"
                  >
                    {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
                  </button>
                )}
              </div>
              <img
                src={recipe.imageUrl}
                alt={recipe.name}
                className="w-full object-contain rounded-md"
              />
              <div className="mt-3">
                {recipe.ingredients?.map((ingredient, index) => (
                  <li key={index} className="text-[12px] mt-2 text-italic">
                    {ingredient}
                  </li>
                ))}
              </div>
              <h4 className="mt-3 text-base text-justify">
                <h1 className="text-2xl text-center mb-2">Instruction</h1>
                {recipe.instruction}
              </h4>
              <h4 className="mt-2 text-lg">
                Cook: {recipe.cookingTime} minutes
              </h4>
            </div>
          );
        })}
      </>
    </div>
  );
};

export default dynamic(() => Promise.resolve(Homepage), { ssr: false });
