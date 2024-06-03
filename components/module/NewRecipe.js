import Recipes from "../../pages/api/recipes";
import Button from "../base/button";

export default function NewRecipe() {
  return (
    <div className="ml-0 mb-36">
      <div className="border-l-[25px] border-solid border-l-leery-lemon max-lg:border-none h-32 flex items-center max-lg:justify-center mb-12 max-lg:mb-0 mx-14">
        <p className="text-5xl max-lg:text-4xl text-navy ml-7">New Recipe</p>
      </div>
      <div className="relative flex justify-between max-lg:items-center max-lg:gap-x-11 max-lg:mx-4 max-lg:flex-col">
        <div className="w-[350px] h-[500px] bg-leery-lemon max-lg:hidden"></div>
        <div className="absolute top-12 left-12 max-lg:static max-lg:mb-6">
          <img src="/assets/burgernew.png" height={500} width={500} className="max-lg:w-72 max-lg:h-72" />
        </div>
        <div className="self-center w-[450px] h-[385] mr-20 max-lg:mr-0 flex flex-col gap-10 max-lg:gap-5 max-lg:px-10 max-lg:items-center">
          <p className="text-5xl max-lg:text-3xl">Healthy Bone Broth Ramen Quick & Easy</p>
          <div className="border-2 border-solid border-b-swinging-wine w-24 max-lg:hidden"></div>
          <div>
            <p>
              Quick + Easy Chicken Bone Broth Ramen- Healthy chicken ramen in a
              hurry? That’s right!
            </p>
          </div>
          <Button>Learn More</Button>
        </div>
      </div>
    </div>
  );
}
