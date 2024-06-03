import NewRecipe from "./NewRecipe";
import PopularRecipe from "./PopularRecipe";
import Discover from "./discover";
import Popular from "./popular";

export default function LandingSection() {
  return (
    <>
      <Discover />
      <div className=" bg-ambrosia-ivory">
        <Popular />
        <NewRecipe />
        <PopularRecipe />
      </div>
    </>
  );
}
