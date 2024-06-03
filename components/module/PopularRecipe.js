// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useRouter } from "next/router";
// import { Loading } from "../base/loading";

// export default function PopularRecipe() {
//   const [recipes, setRecipes] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const router = useRouter();

//   useEffect(() => {
//     const fetchRecipes = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get(
//           `${process.env.NEXT_PUBLIC_BASE_URL}/recipes`
//         );
//         setRecipes(response.data.data);
//         setLoading(false);
//       } catch (error) {
//         setError(error);
//         setLoading(false);
//       }
//     };

//     fetchRecipes();
//   }, []);

//   if (loading)
//     return (
//       <div className="flex justify-center my-32">
//         <Loading />
//       </div>
//     );
//   if (error) return <div>Error: {error.message}</div>;
//   return (
//     <div className="ml-0 pb-32 box-border">
//       <div className="border-l-[25px] border-solid border-l-leery-lemon max-lg:border-none h-32 flex items-center max-lg:justify-center max-lg:mb-0 mb-12 mx-14">
//         <p className="text-5xl text-navy ml-7">Popular Recipe</p>
//       </div>
//       <div className="flex flex-wrap gap-12 justify-center">
//         {recipes.map((recipe) => (
//           <button
//             key={recipe.id}
//             onClick={() => router.push(`/detailrecipe/${recipe.id}`)}
//           >
//             <div className=" relative hover:opacity-70">
//               <img
//                 className=" w-96 h-96 max-lg:w-72 max-lg:h-72"
//                 src={`${recipe.image || "/assets/food.png"}`}
//                 alt=""
//               />
//               <div className=" absolute bottom-4 left-5 font-semibold text-2xl w-36 capitalize text-left">
//                 <p>{recipe.title}</p>
//               </div>
//             </div>
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { Loading } from "../base/loading";

export default function PopularRecipe() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6
  const router = useRouter();

  const fetchRecipes = async (page) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/recipes?page=${page}&limit=${itemsPerPage}`
      );
      setRecipes(response.data.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes(currentPage);
  }, [currentPage]);

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
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="ml-0 pb-32 box-border">
      <div className="border-l-[25px] border-solid border-l-leery-lemon max-lg:border-none h-32 flex items-center max-lg:justify-center max-lg:mb-0 mb-12 mx-14">
        <p className="text-5xl text-navy ml-7">Popular Recipe</p>
      </div>
      <div className="flex flex-wrap gap-12 justify-center">
        {recipes.map((recipe) => (
          <button
            key={recipe.id}
            onClick={() => router.push(`/detailrecipe/${recipe.id}`)}
          >
            <div className="relative hover:opacity-70">
              <img
                className="w-96 h-96 max-lg:w-72 max-lg:h-72"
                src={`${recipe.image || "/assets/food.png"}`}
                alt=""
              />
              <div className="absolute bottom-4 left-5 font-semibold text-2xl w-36 capitalize text-left text-white">
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
