// import Input from "../base/input";
import Search from "../base/searchBar";

export default function Discover() {
  return (
    <div className="flex flex-col lg:flex-row px-14 box-border bg-bg-pattern bg-cover max-lg:bg-ambrosia-ivory max-lg:bg-none">
      <div className="self-center text-center lg:text-left mb-6 lg:mb-0 lg:flex-1">
        <p className="text-4xl lg:text-7xl font-bold text-navy mb-6">
          Discover Recipe & Delicious Food
        </p>
        <Search type="text" placeholder="Search Bar" className="max-md:h-10 max-lg:text-xs max-lg:font-semibold" />
      </div>
      <div className="hidden lg:block lg:flex-1">
        <img src="/assets/discover.png" alt="Discover" className="w-full h-auto" />
      </div>
    </div>
  );
}
