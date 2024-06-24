import Button from "../base/button";

export default function NewRecipe() {
  return (
    <div className="ml-0 mb-36 max-lg:mb-0">
      <div className="border-l-[25px] border-solid border-l-leery-lemon max-lg:border-none h-32 flex items-center max-lg:justify-center mb-12 max-lg:mb-0 mx-14">
        <p className="text-5xl max-lg:text-4xl text-navy ml-7">New Recipe</p>
      </div>
      <div className="relative flex justify-between max-md:items-center max-lg:gap-x-1 max-lg:justify-evenly max-md:flex-col">
        <div className="w-[350px] h-[500px] bg-leery-lemon max-lg:hidden"></div>
        <div className="absolute top-12 left-12 max-lg:static max-lg:mb-6">
          <img src="/assets/burgernew.png" height={500} width={500} className="max-lg:w-60 max-lg:h-60" />
        </div>
        <div className="self-center w-1/2 max-lg:w-1/2 max-xl:w-2/5 max-md:w-full flex flex-col gap-10 max-lg:gap-5 max-lg:px-10 max-lg:items-center">
          <p className="text-5xl max-md:text-2xl max-lg:text-3xl">Special Chicken & Shallot Burger Quick & Easy</p>
          <div className="border-2 border-solid border-b-swinging-wine w-24 max-lg:hidden"></div>
          <div>
            <p>
              Quick + Easy Chicken Bone Broth Ramen- Healthy chicken ramen in a
              hurry? That’s right!
            </p>
          </div>
          <div className="max-lg:self-start max-md:self-center">
          <Button className="max-lg:h-12">Learn More</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
