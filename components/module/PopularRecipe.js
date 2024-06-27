import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Loading } from "../base/loading";
import { useDispatch, useSelector } from "react-redux";
import { wrapper } from "../../configs/store";
import { getRecipe } from "../../configs/redux/actions/recipeActions";

export default function PopularRecipe() {
  const [currentPage, setCurrentPage] = React.useState(1)
  const itemsPerPage = 6
  const router = useRouter();
  const dispatch = useDispatch();
  const {recipes, loading, error} = useSelector((state) => state.recipe);

  React.useEffect(() => {
    dispatch(getRecipe(currentPage))
    // fetchRecipes(currentPage);
  }, [currentPage, dispatch]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const hasNextPage = recipes.length === itemsPerPage;

  if (loading)
    return (
      <div className="flex justify-center my-32">
        <Loading />
      </div>
    );
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="ml-0 pb-32 box-border">
      <div className="border-l-[25px] border-solid border-l-leery-lemon max-lg:border-none h-32 flex items-center max-lg:justify-center max-lg:mb-0 mb-12 mx-14">
        <p className="text-5xl text-navy ml-7 max-md:text-3xl">Popular Recipe</p>
      </div>
      <div className="flex flex-wrap gap-12 max-lg:gap-2 justify-center">
        {recipes.map((recipe) => (
          <button
            key={recipe.id}
            onClick={() => router.push(`/detailrecipe/${recipe.id}`)}
          >
            <div className="relative ">
              <img
                className="w-96 h-96 max-md:w-48 max-md:h-48 max-lg:w-56 max-lg:h-56 rounded-md hover:opacity-70"
                src={`${recipe.image || "/assets/food.png"}`}
                alt=""
              />
              <div className="absolute bottom-4 left-5 font-semibold text-2xl max-md:text-sm max-lg:text-xl w-80 max-md:w-40 max-lg:w-48 capitalize text-white text-center bg-leery-lemon bg-opacity-70 p-1 rounded-lg">
                <p>{recipe.title}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 mx-2 bg-leery-lemon rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="px-4 py-2 mx-2">{currentPage}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={!hasNextPage}
          className="px-4 py-2 mx-2 bg-leery-lemon rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  const { page = 1 } = context.query;
  await store.dispatch(getRecipe(page));
  return { props: {} };
});
