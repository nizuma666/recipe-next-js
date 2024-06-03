import axios from "axios";
import { useEffect, useState } from "react";
import { GetTokenFromLocalStorage } from "../../services/GetToken";
import Button from "../../components/base/button";
import { Loading } from "../../components/base/loading";
import { useRouter } from "next/router";
import Notification from "../../components/module/modal";

export default function Profile() {
  const [profile, setProfile] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [liked, setLiked] = useState([]);
  const [saved, setSaved] = useState([]);
  const [loading, setLoading] = useState(true);
  const [menu, setMenu] = useState("myrecipe");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const [titleMessage, setTitleMessage] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const token = GetTokenFromLocalStorage();
  const router = useRouter();
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/users/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProfile(response.data.data);
        // console.log(response.data.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        console.log(error.response.data.message);
        setLoading(false);
      }
    };
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/recipes/self`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setRecipes(response.data.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    const fetchLiked = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/recipes/like`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setLiked(response.data.data);
        // console.log(response.data.data[1].recipe.title);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    const fetchSaved = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/recipes/save`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setSaved(response.data.data);
        // console.log(response.data.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchRecipes();
    fetchProfile();
    fetchLiked();
    fetchSaved();
  }, []);

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

  if (loading)
    return (
      <div className="flex justify-center my-32">
        <Loading />
      </div>
    );
  if (error)
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
      <div className="flex flex-col items-center gap-y-4 mb-20">
        <div>
          <img
            className="rounded-full border-2 border-solid"
            src="/assets/profile.png"
            width={172}
            height={172}
          />
        </div>
        <div className="font-medium text-2xl capitalize">
          <p>{profile.name}</p>
        </div>
      </div>
      <div className="flex border-b-2 border-solid mb-20 justify-start pl-10 gap-x-7">
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
        <div className="flex flex-wrap gap-12 justify-center">
          {recipes.length === 0 ? (
            <div className="text-center font-semibold text-2xl">Data Empty</div>
          ) : (
            recipes.map((recipe) => (
              <button
                key={recipe.id}
                onClick={() => router.push(`/detailrecipe/${recipe.id}`)}
              >
                <div className="relative hover:opacity-70">
                  <img
                    className="w-96 h-96"
                    src={`${recipe.image || "/assets/food.png"}`}
                    alt=""
                  />
                  <div className="absolute bottom-4 left-5 font-semibold text-2xl w-36 capitalize text-white">
                    <p>{recipe.title}</p>
                  </div>
                </div>
              </button>
            ))
          )}
        </div>
      )}
      {menu === "savedrecipe" && (
        <div className="flex flex-wrap gap-12 justify-center">
          {saved.length === 0 ? (
            <div className="text-center font-semibold text-2xl">Data Empty</div>
          ) : (
            saved.map((save) => (
              <div>
                <button
                  key={save.id}
                  onClick={() => router.push(`/detailrecipe/${save.recipe.id}`)}
                >
                  <div className="relative hover:opacity-70">
                    <img
                      className="w-96 h-96"
                      src={`${save.recipe.image || "/assets/food.png"}`}
                      alt=""
                    />
                    <div className="absolute bottom-4 left-5 font-semibold text-2xl w-36 capitalize text-white">
                      <p>{save.recipe.title}</p>
                    </div>
                  </div>
                </button>
                <div className="self-center">
                  <Button
                    onClick={() => handleDeleteSave(save.id)}
                    className="bg-red-500 h-11 flex gap-x-2 justify-center items-center hover:opacity-75 w-full"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="22"
                      id="trash"
                    >
                      <g
                        fill="none"
                        fill-rule="evenodd"
                        stroke="#F6F5F2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      >
                        <path d="M1 5h18M17 5v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5m3 0V3a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M8 10v6M12 10v6"></path>
                      </g>
                    </svg>
                    Delete
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
      {menu === "likedrecipe" && (
        <div className="flex flex-wrap gap-12 justify-center">
          {liked.length === 0 ? (
            <div className="text-center font-semibold text-2xl">Data Empty</div>
          ) : (
            liked.map((like) => (
              <div>
                <button
                  key={like.id}
                  onClick={() => router.push(`/detailrecipe/${like.recipe.id}`)}
                >
                  <div className="relative hover:opacity-70">
                    <img
                      className="w-96 h-96"
                      src={`${like.recipe.image || "/assets/food.png"}`}
                      alt=""
                    />
                    <div className="absolute bottom-4 left-5 font-semibold text-2xl w-36 capitalize text-white">
                      <p>{like.recipe.title}</p>
                    </div>
                  </div>
                </button>
                <div className="self-center">
                  <Button
                    onClick={() => handleDeleteLike(like.id)}
                    className="bg-red-500 h-11 flex gap-x-2 justify-center items-center hover:opacity-75 w-full"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="22"
                      id="trash"
                    >
                      <g
                        fill="none"
                        fill-rule="evenodd"
                        stroke="#F6F5F2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      >
                        <path d="M1 5h18M17 5v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5m3 0V3a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M8 10v6M12 10v6"></path>
                      </g>
                    </svg>
                    Delete
                  </Button>
                </div>
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
