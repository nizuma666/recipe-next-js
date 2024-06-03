import { useSearchParams } from "next/navigation";
import NewRecipe from "../components/module/NewRecipe";
import PopularRecipe from "../components/module/PopularRecipe";
import Discover from "../components/module/discover";
import Popular from "../components/module/popular";
import SearchResult from "./resultsearch";

export default function Page() {
  const searchParams = useSearchParams();
  if (searchParams.get('search')) {
    return <SearchResult />
  }
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
