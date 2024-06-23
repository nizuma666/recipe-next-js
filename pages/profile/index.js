import axios from "axios";
import { useEffect, useState } from "react";
import { GetTokenFromLocalStorage } from "../../services/GetToken";
import Button from "../../components/base/button";
import { Loading } from "../../components/base/loading";
import { useRouter } from "next/router";
import Notification from "../../components/module/modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faChevronDown,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../../configs/redux/actions/profileAction";
import { getMyRecipe } from "../../configs/redux/actions/recipeActions";
import withAuth from "../../services/withAuth";
import {
  fetchLikedRecipes,
  fetchSavedRecipes,
} from "../../configs/redux/actions/likeActions";
import { getCookie } from "cookies-next";

function Profile() {
  const [menu, setMenu] = useState("myrecipe");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const [titleMessage, setTitleMessage] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const token = getCookie("token");
  // const token = localStorage.getItem("token");
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useDispatch();

  const { user, loadingUser, errorUser } = useSelector(
    (state) => state.profile
  );

  const { myRecipe } = useSelector((state) => state.recipe);
  const { likedRecipes: liked } = useSelector((state) => state.likes);
  const { savedRecipes: saved } = useSelector((state) => state.likes);
  console.log("data like", token);
  // const loading = useSelector((state) => state.likes.loading);
  useEffect(() => {
    if (!token) {
      router.push("/auth/login");
      return;
    }
    dispatch(getProfile(token));
    dispatch(getMyRecipe(token));
    dispatch(fetchLikedRecipes(token));
    dispatch(fetchSavedRecipes(token));
  }, [token, dispatch]);

  const [profileImage, setProfileImage] = useState("/assets/profile.png");
  const [showUploadIcon, setShowUploadIcon] = useState(true);

  const handleUploadImage = (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    axios
      .post(`${process.env.NEXT_PUBLIC_BASE_URL}/upload`, formData)
      .then((res) => {
        const { file_url } = res.data.data;
        setProfileImage(file_url);
        setShowUploadIcon(false);
      });
  };

  const handleDeleteRecipe = (id) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .delete(`${process.env.NEXT_PUBLIC_BASE_URL}/recipes/${id}`, config)
      .then(() => {
        setMessage("Delete recipe success");
        setTitleMessage("DELETE");
        setOpenModal(true);
      })
      .catch((err) => {
        setError(true);
        setMessage(err.response.data.message);
        setTitleMessage("Failed to delete recipe");
        setOpenModal(true);
      });
  };

  const handleDeleteSave = (id) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .delete(`${process.env.NEXT_PUBLIC_BASE_URL}/recipes/save/${id}`, config)
      .then((res) => {
        setMessage("Delete saved recipe success");
        setTitleMessage("DELETE");
        setOpenModal(true);
      })
      .catch((err) => {
        setError(true);
        setMessage(err.response.data.message);
        setTitleMessage("Failed to delete saved recipe");
        setOpenModal(true);
      });
  };
  const handleDeleteLike = (id) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .delete(`${process.env.NEXT_PUBLIC_BASE_URL}/recipes/like/${id}`, config)
      .then((res) => {
        setMessage("Delete liked recipe success");
        setTitleMessage("DELETE");
        setOpenModal(true);
      })
      .catch((err) => {
        setError(true);
        setMessage(err.response.data.message);
        setTitleMessage("Failed to delete liked recipe");
        setOpenModal(true);
      });
  };

  const toggleMenu = (menu) => {
    setMenu(menu === "menu" ? null : menu);
  };
  const closeModal = () => {
    if (error) {
      setOpenModal(false);
      window.location.reload();
      //   router.push("/auth/login");
    } else {
      setOpenModal(false);
      window.location.reload();
    }
  };
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  if (loadingUser)
    return (
      <div className="flex justify-center my-32">
        <Loading />
      </div>
    );
  if (errorUser)
    return (
      <Notification
        isOpen={openModal}
        onClose={closeModal}
        title={titleMessage}
      >
        {message}
      </Notification>
    );
  return (
    <div className="mb-14">
      <div className="flex flex-col items-center gap-y-4 mb-10">
        <div className="relative">
          <img
            className="rounded-full border-2 border-solid w-24 h-24 md:w-32 md:h-32 lg:w-44 lg:h-44"
            src={profileImage}
            alt="Profile"
          />
          <button className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow-md">
            <label htmlFor="profile-upload" className="cursor-pointer">
              <FontAwesomeIcon icon={faPenToSquare} />
            </label>
            <input
              id="profile-upload"
              type="file"
              onChange={handleUploadImage}
              className="hidden"
            />
          </button>
        </div>
        <div className="font-medium text-lg md:text-xl lg:text-2xl capitalize text-center">
          <p>{user.name}</p>
        </div>
      </div>
      <div className="block md:hidden mb-5">
        <button
          onClick={toggleDropdown}
          className="w-full bg-white p-3 flex justify-between items-center"
        >
          <span>
            {menu.charAt(0).toUpperCase() +
              menu.slice(1).replace("recipe", " Recipe")}
          </span>
          <FontAwesomeIcon icon={faChevronDown} />
        </button>
        {dropdownOpen && (
          <div className="flex flex-col">
            <button
              className={`py-2 px-4 ${
                menu === "myrecipe" ? "text-gray-500" : "text-black"
              } bg-white`}
              onClick={() => {
                toggleMenu("myrecipe");
                toggleDropdown();
              }}
            >
              My Recipe
            </button>
            <button
              className={`py-2 px-4 ${
                menu === "savedrecipe" ? "text-gray-500" : "text-black"
              } bg-white`}
              onClick={() => {
                toggleMenu("savedrecipe");
                toggleDropdown();
              }}
            >
              Saved Recipe
            </button>
            <button
              className={`py-2 px-4 ${
                menu === "likedrecipe" ? "text-gray-500" : "text-black"
              } bg-white`}
              onClick={() => {
                toggleMenu("likedrecipe");
                toggleDropdown();
              }}
            >
              Liked Recipe
            </button>
          </div>
        )}
      </div>
      <div className="hidden md:flex md:flex-row border-b-2 border-solid mb-10 justify-center md:justify-start gap-x-7 pl-0 md:pl-10">
        <div>
          <Button
            className={` ${
              menu === "myrecipe" ? "text-gray-500" : "text-black"
            } bg-white`}
            onClick={() => toggleMenu("myrecipe")}
          >
            My Recipe
          </Button>
        </div>
        <div>
          <Button
            className={` ${
              menu === "savedrecipe" ? "text-gray-500" : "text-black"
            } bg-white`}
            onClick={() => toggleMenu("savedrecipe")}
          >
            Saved Recipe
          </Button>
        </div>
        <div>
          <Button
            className={` ${
              menu === "likedrecipe" ? "text-gray-500" : "text-black"
            } bg-white`}
            onClick={() => toggleMenu("likedrecipe")}
          >
            Liked Recipe
          </Button>
        </div>
      </div>
      {menu === "myrecipe" && (
        <div className="flex flex-wrap gap-4 justify-center">
          {myRecipe.length === 0 ? (
            <div className="text-center font-semibold text-lg md:text-xl lg:text-2xl">
              Data Empty
            </div>
          ) : (
            myRecipe.map((recipe) => (
              <div className="relative" key={recipe.id}>
                <button
                  onClick={() => router.push(`/detailrecipe/${recipe.id}`)}
                >
                  <div className="relative hover:opacity-70">
                    <img
                      className="w-40 h-40 md:w-60 md:h-60 lg:w-80 lg:h-80 rounded-md"
                      src={`${recipe.image || "/assets/food.png"}`}
                      alt={recipe.title}
                    />
                    <div className="absolute bottom-2 left-2 font-semibold text-sm md:text-lg lg:text-xl w-28 md:w-32 lg:w-36 capitalize text-white">
                      <p>{recipe.title}</p>
                    </div>
                  </div>
                </button>
                <button
                  onClick={() => handleDeleteRecipe(recipe.id)}
                  className="absolute top-2 right-2 hover:bg-red-700 bg-red-500 rounded-full w-5 h-5 md:w-6 md:h-6 flex justify-center items-center"
                >
                  <FontAwesomeIcon
                    icon={faXmark}
                    style={{ color: "#f9f8f6" }}
                  />
                </button>
                <button
                  onClick={() => router.push(`/editrecipe/${recipe.id}`)}
                  className="absolute top-2 right-10 hover:bg-yellow-500 bg-yellow-300 lemon rounded-full w-5 h-5 md:w-6 md:h-6 flex justify-center items-center"
                >
                  <FontAwesomeIcon icon={faPenToSquare} />
                </button>
              </div>
            ))
          )}
        </div>
      )}
      {menu === "savedrecipe" && (
        <div className="flex flex-wrap gap-4 justify-center">
          {saved.length === 0 ? (
            <div className="text-center font-semibold text-lg md:text-xl lg:text-2xl">
              Data Empty
            </div>
          ) : (
            saved.map((save) => (
              <div className="relative" key={save.id}>
                <button
                  onClick={() => router.push(`/detailrecipe/${save.recipe.id}`)}
                >
                  <div className="relative hover:opacity-70">
                    <img
                      className="w-40 h-40 md:w-60 md:h-60 lg:w-80 lg:h-80 rounded-md"
                      src={`${save.recipe.image || "/assets/food.png"}`}
                      alt={save.recipe.title}
                    />
                    <div className="absolute bottom-2 left-2 font-semibold text-sm md:text-lg lg:text-xl w-28 md:w-32 lg:w-36 capitalize text-white">
                      <p>{save.recipe.title}</p>
                    </div>
                  </div>
                </button>
                <button
                  onClick={() => handleDeleteSave(save.id)}
                  className="absolute top-2 right-2 hover:bg-red-700 bg-red-500 rounded-full w-5 h-5 md:w-6 md:h-6 flex justify-center items-center"
                >
                  <FontAwesomeIcon
                    icon={faXmark}
                    style={{ color: "#f9f8f6" }}
                  />
                </button>
              </div>
            ))
          )}
        </div>
      )}
      {menu === "likedrecipe" && (
        <div className="flex flex-wrap gap-4 justify-center">
          {liked.length === 0 ? (
            <div className="text-center font-semibold text-lg md:text-xl lg:text-2xl">
              Data Empty
            </div>
          ) : (
            liked.map((like) => (
              <div className="relative" key={like.id}>
                <button
                  onClick={() => router.push(`/detailrecipe/${like.recipe.id}`)}
                >
                  <div className="relative hover:opacity-70">
                    <img
                      className="w-40 h-40 md:w-60 md:h-60 lg:w-80 lg:h-80 rounded-md"
                      src={`${like.recipe.image || "/assets/food.png"}`}
                      alt={like.recipe.title}
                    />
                    <div className="absolute bottom-2 left-2 font-semibold text-sm md:text-lg lg:text-xl w-28 md:w-32 lg:w-36 capitalize text-white">
                      <p>{like.recipe.title}</p>
                    </div>
                  </div>
                </button>
                <button
                  onClick={() => handleDeleteLike(like.id)}
                  className="absolute top-2 right-2 hover:bg-red-700 bg-red-500 rounded-full w-5 h-5 flex justify-center items-center md:w-6 md:h-6"
                >
                  <FontAwesomeIcon
                    icon={faXmark}
                    style={{ color: "#f9f8f6" }}
                  />
                </button>
              </div>
            ))
          )}
        </div>
      )}
      <Notification
        isOpen={openModal}
        onClose={closeModal}
        title={titleMessage}
      >
        {message}
      </Notification>
    </div>
  );
}
export default Profile;
