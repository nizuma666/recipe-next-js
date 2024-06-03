import clsx from "clsx";
// import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useState } from "react";
export default function Search({
  className,
  placeholder,
  name,
  value,
  type,
  onChange,
}) {
  const [searchResult, setSearchResult] = useState("");
  const router = useRouter();
  // const search = searchParams.get('search') ?? '';
  const handleSubmit = (e) => {
    e.preventDefault();
    router.push({ 
        pathname: '/resultsearch',
        query: {search: searchResult} });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          className={clsx("w-3/4 h-16 pl-5 rounded-md outline-none", className)}
          placeholder={placeholder}
          name={name}
          value={value}
          type={type}
          onChange={(e) => {
            setSearchResult(e.target.value);
          }}
          required
        />
      </form>
    </div>
  );
}
