import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { userIdHook } from "../hookState/userIdHook";

const CreateRecipe = () => {
  const userId = userIdHook();
  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: [""],
    instruction: "",
    imageUrl: "",
    cookingTime: 0,
    userId: userId,
  });

  const router = useRouter();

  const handleFormChange = (event) => {
    setRecipe({ ...recipe, [event.target.name]: event.target.value });
  };

  const handleIngredientChange = (event, index) => {
    try {
      const { value } = event.target;
      const ingredients = recipe.ingredients;
      ingredients[index] = value;
      setRecipe({ ...recipe, ingredients });
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddIngredient = () => {
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ""] });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(
        "https://recipe-server-fypv.onrender.com/recipes/createRecipe",
        recipe
      );
      alert("Recipe created");
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="w-full h-screen bg-slate-900 flex flex-col justify-center items-center">
      <h1 className="text-4xl mb-4">Create Recipe</h1>
      <form
        method="POST"
        className="w-4/5 h-auto my-2 px-3 pb-4 flex flex-col border border-slate-600 md:w-96"
      >
        <label htmlFor="name" className="w-auto my-2 inline-block">
          Name
        </label>
        <input
          type="text"
          name="name"
          value={recipe.name}
          onChange={handleFormChange}
          className="bg-inherit w-full h-7 px-2 py-2 outline-none rounded-md border border-slate-800"
        />
        <label htmlFor="ingredients" className="w-auto mt-2 inline-block">
          Ingredients
        </label>
        <>
          {recipe.ingredients.map((ingredient, index) => {
            return (
              <input
                key={index}
                type="text"
                name="ingredients"
                value={ingredient}
                onChange={(event) => handleIngredientChange(event, index)}
                className="bg-inherit w-full h-7 mt-2 px-2 py-2 outline-none rounded-md border border-slate-800"
              />
            );
          })}
        </>
        <button
          type="button"
          onClick={handleAddIngredient}
          className="bg-slate-800 w-36 h-auto mt-3 px-3 py-1 place-self-center rounded-md border border-slate-700"
        >
          Add Ingredient
        </button>
        <label htmlFor="instruction" className="w-auto my-2 inline-block">
          Instruction
        </label>
        <input
          type="text"
          name="instruction"
          value={recipe.instruction}
          onChange={handleFormChange}
          className="bg-inherit w-full h-7 px-2 py-2 outline-none rounded-md border border-slate-800"
        />
        <label htmlFor="imageUrl" className="w-auto my-2 inline-block">
          Image Url
        </label>
        <input
          type="text"
          name="imageUrl"
          value={recipe.imageUrl}
          onChange={handleFormChange}
          className="bg-inherit w-full h-7 px-2 py-2 outline-none rounded-md border border-slate-800"
        />
        <label htmlFor="cookingTime" className="w-auto my-2 inline-block">
          Cooking Time
        </label>
        <input
          type="number"
          name="cookingTime"
          value={recipe.cookingTime}
          onChange={handleFormChange}
          className="bg-inherit w-full h-7 px-2 py-2 outline-none rounded-md border border-slate-800"
        />
        <button
          type="submit"
          onClick={handleSubmit}
          className="bg-slate-800 w-auto h-auto mt-3 mx-auto px-3 py-1 rounded-md border border-slate-700"
        >
          Create Recipe
        </button>
      </form>
    </div>
  );
};

export default CreateRecipe;
