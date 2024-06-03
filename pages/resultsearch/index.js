import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import { Loading } from "../../components/base/loading";
// import food from '/public/assets/food.png'
// import { GetRecipes } from '../../pages/api/recipes';

export default function SearchResult() {
  const searchParams = useSearchParams();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const search = searchParams.get("search") ?? "";

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/recipes`,
          {
            params: { search: search },
          }
        );
        setRecipes(response.data.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);
  // const handleClick = () => {

  // }

  if (loading)
    return (
      <div className="flex justify-center my-32">
        <Loading />
      </div>
    );
  if (error) return <div>Error: {error.message}</div>;
  return (
    <div className="ml-0 pb-32 box-border">
      <div className="h-32 flex items-center max-lg:justify-center max-lg:mb-0 mb-12 mx-14">
        <p className="text-5xl text-navy ml-7">Search Result</p>
      </div>
      <div className="flex flex-wrap gap-12 justify-center">
        {recipes.map((recipe) => (
          <button
            key={recipe.id}
            onClick={() => router.push(`/detailrecipe/${recipe.id}`)}
          >
            <div className=" relative hover:opacity-70">
              <img
                className=" w-96 h-96 max-lg:w-72 max-lg:h-72"
                src={`${recipe.image || "/assets/food.png"}`}
                alt=""
              />
              <div className=" absolute bottom-4 left-5 font-semibold text-2xl w-36 capitalize text-left">
                <p>{recipe.title}</p>
              </div>
            </div>
          </button>
        ))}
        {/* <div className=" relative">
            <img className=" w-96 h-96" src="/assets/hamburger.png" />
            <div className="absolute bottom-4 left-5 font-semibold text-2xl w-36">
              <p>King Burger</p>
            </div>
          </div>
          <div className=" relative">
            <img className=" w-96 h-96" src="/assets/hamburger.png" />
            <div className="absolute bottom-4 left-5 font-semibold text-2xl w-36">
              <p>King Burger</p>
            </div>
          </div>
          <div className=" relative">
            <img className=" w-96 h-96" src="/assets/hamburger.png" />
            <div className="absolute bottom-4 left-5 font-semibold text-2xl w-36">
              <p>King Burger</p>
            </div>
          </div>
          <div className=" relative">
            <img className=" w-96 h-96" src="/assets/hamburger.png" />
            <div className="absolute bottom-4 left-5 font-semibold text-2xl w-36">
              <p>King Burger</p>
            </div>
          </div>
          <div className=" relative">
            <img className=" w-96 h-96" src="/assets/hamburger.png" />
            <div className="absolute bottom-4 left-5 font-semibold text-2xl w-36">
              <p>King Burger</p>
            </div>
          </div> */}
      </div>
    </div>
  );
}
