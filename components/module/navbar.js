import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Notification from "./modal";
// import Button from "../base/button";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [message, setMessage] = useState("");
  const [titleMessage, setTitleMessage] = useState("");
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
      // console.log(token);
    }
  }, []);
  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      setIsLoggedIn(false);
      router.push("/")
    }
  };
  const handleNavAddRecipe = () => {
    if (isLoggedIn) {
      router.push("/addrecipe");
    } else {
      setMessage("You must first log in");
      setTitleMessage("Alert");
      setOpenModal(true);
      console.log(openModal);
    }
  };
  const handleNavProfile = () => {
    if (isLoggedIn) {
      router.push("/profile");
    } else {
      setMessage("You must first log in");
      setTitleMessage("Alert");
      setOpenModal(true);
      console.log(openModal);
    }
  };
  const closeModal = () => {
    setOpenModal(false);
    router.push("/auth/login");
  };
  return (
    // <div
    //   className={`flex p-12 box-border justify-between text-lg text-navy ${
    //     router.pathname !== "/" ? "" : "bg-bg-pattern bg-cover max-lg:bg-ambrosia-ivory max-lg:bg-none"
    //   }`}
    // >
    //   <div className="flex justify-start gap-52 max-lg:gap-7">
    //     <div>
    //       <Link href="/">Home</Link>
    //     </div>
    //     <div>
    //       <button onClick={handleNavAddRecipe}>Add Recipe</button>
    //     </div>
    //     <div>
    //     <button onClick={handleNavProfile}>Profile</button>
    //     </div>
    //     <Notification
    //       isOpen={openModal}
    //       onClose={closeModal}
    //       title={titleMessage}
    //     >
    //       {message}
    //     </Notification>
    //   </div>
    //   {isLoggedIn ? (
    //     <div className="flex items-center gap-2 hover:border-2 hover:border-solid p-1 box-border rounded-md">
    //       <div className="rounded-full bg-white p-2 max-lg:border-2 max-lg:border-solid">
    //         <img src="/assets/profile.png" width={22} height={22} alt="" className="" />
    //       </div>
    //       <button
    //         onClick={handleLogout}
    //         className={`${
    //           router.pathname !== "/" ? "text-navy" : "text-white max-lg:text-navy"
    //         } `}
    //       >
    //         Logout
    //       </button>
    //     </div>
    //   ) : (
    //     <Link href="/auth/login">
    //       <div className="flex items-center gap-2 hover:border-2 hover:border-solid p-1 box-border rounded-md">
    //         <div className="rounded-full bg-white p-2">
    //           <img src="/assets/profile.png" width={22} height={22} alt="" />
    //         </div>
    //         <p className="text-white">Login</p>
    //       </div>
    //     </Link>
    //   )}
    // </div>
    <div className={`flex flex-col lg:flex-row p-12 box-border justify-between text-lg text-navy ${router.pathname !== "/" ? "" : "bg-bg-pattern bg-cover max-lg:bg-ambrosia-ivory max-lg:bg-none"}`}>
      <div className="flex justify-between lg:justify-start w-full lg:w-auto">
        <div className="flex lg:gap-x-52">
          <div>
            <Link href="/">Home</Link>
          </div>
          <div className="hidden lg:block">
            <button onClick={handleNavAddRecipe}>Add Recipe</button>
          </div>
          <div className="hidden lg:block">
            <button onClick={handleNavProfile}>Profile</button>
          </div>
        </div>
        <button className="lg:hidden" onClick={toggleMenu}>
          {/* Icon Hamburger */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`${menuOpen ? 'block' : 'hidden'} lg:flex flex-col lg:flex-row w-full lg:w-auto`}>
        <div className="flex flex-col lg:flex-row gap-7 mt-4 lg:mt-0">
          <div className="lg:hidden">
            <button onClick={handleNavAddRecipe}>Add Recipe</button>
          </div>
          <div className="lg:hidden">
            <button onClick={handleNavProfile}>Profile</button>
          </div>
          <Notification isOpen={openModal} onClose={closeModal} title={titleMessage}>
            {message}
          </Notification>
        </div>

        {isLoggedIn ? (
          <div className="flex items-center gap-2 hover:border-2 hover:border-solid p-1 box-border rounded-md mt-4 lg:mt-0">
            <div className="rounded-full bg-white p-2 lg:border-2 lg:border-solid">
              <img src="/assets/profile.png" width={22} height={22} alt="" />
            </div>
            <button onClick={handleLogout} className={`${router.pathname !== "/" ? "text-navy" : "text-white max-lg:text-navy"}`}>
              Logout
            </button>
          </div>
        ) : (
          <Link href="/auth/login">
            <div className="flex items-center gap-2 hover:border-2 hover:border-solid p-1 box-border rounded-md mt-4 lg:mt-0">
              <div className="rounded-full bg-white p-2">
                <img src="/assets/profile.png" width={22} height={22} alt="" />
              </div>
              <p className="text-white lg:text-navy">Login</p>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;
