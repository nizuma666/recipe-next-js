import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Loading } from "../../components/base/loading";
import { GetTokenFromLocalStorage } from "../../services/GetToken";
import Notification from "../../components/module/modal";
import { useDispatch, useSelector } from "react-redux";
import { getDetailRecipe } from "../../configs/redux/actions/recipeActions";
import {
  fetchLikedRecipes,
  fetchSavedRecipes,
  likeRecipe,
  saveRecipe,
} from "../../configs/redux/actions/likeActions";
import { getCookie } from "cookies-next";
import axios from "axios";

export default function detailrecipe() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [titleMessage, setTitleMessage] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const { id } = router.query;
  const token = getCookie("token");
  const [isLogin, setIsLogin] = useState(true);
  const dispatch = useDispatch();
  // const token = useSelector((state) => state.auth.user);
  const { loading, error, detailRecipe } = useSelector((state) => state.recipe);
  const likedRecipes = useSelector((state) => state.likes.likedRecipes);
  const savedRecipes = useSelector((state) => state.likes.savedRecipes);
  const isLiked = likedRecipes.find(
    (like) => like.recipe_id === detailRecipe.id
  );
  const isSaved = savedRecipes.find(
    (save) => save.recipe_id === detailRecipe.id
  );
  console.log("saved", isLiked);
  useEffect(() => {
    if (!id) return;
    if (!token) {
      dispatch(getDetailRecipe(id));
      return;
    }
    dispatch(getDetailRecipe(id));
    dispatch(fetchLikedRecipes(token));
    dispatch(fetchSavedRecipes(token));
  }, [id]);

  const handleSave = () => {
    if (token == null) {
      setMessage("You must first log in");
      setTitleMessage("Failed to save recipes");
      setOpenModal(true);
      setIsLogin(false);
    } else {
      if (isSaved) {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        axios
          .delete(
            `${process.env.NEXT_PUBLIC_BASE_URL}/recipes/save/${isSaved.id}`,
            config
          )
          .then((res) => {
            console.log("berhasil unsave", res);
            window.location.reload();
          })
          .catch((err) => {
            console.log("error unsave", err);
          });
      } else {
        dispatch(saveRecipe(detailRecipe.id, token));
      }
    }
  };
  const handleLike = () => {
    if (token == null) {
      setMessage("You must first log in");
      setTitleMessage("Failed to save recipes");
      setOpenModal(true);
      setIsLogin(false);
    } else {
      if (isLiked) {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        axios
          .delete(
            `${process.env.NEXT_PUBLIC_BASE_URL}/recipes/like/${isLiked.id}`,
            config
          )
          .then((res) => {
            console.log("berhasil unlike", res);
            window.location.reload();
          })
          .catch((err) => {
            console.log("error unlike", err);
          });
      } else {
        dispatch(likeRecipe(detailRecipe.id, token));
      }
      
    }
  };
  const closeModal = () => {
    if (!isLogin) {
      setOpenModal(false);
      router.push("/auth/login");
    } else {
      setOpenModal(false);
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
    <div className="flex flex-col mb-40 gap-y-10 px-40 max-lg:px-10 box-border">
      <div className="self-center">
        <p className="font-medium text-6xl text-navy max-lg:text-4xl text-center">
          {detailRecipe.title}
        </p>
      </div>
      <div className="self-center relative">
        <img
          src={`${detailRecipe.image || "/assets/food.png"}`}
          width={400}
          className="max-md:w-48 max-md:h-48 max-lg:w-56 max-lg:h-56 rounded-md"
        />
        <div className="flex gap-x-2 absolute right-2 bottom-2">
          <button onClick={handleLike} className="hover:opacity-70">
            <div
              className={`bg-leery-lemon rounded-md p-1 ${
                isLiked ? "bg-red-500" : ""
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 8.467 8.467"
                id="like"
              >
                <path
                  d="M1.322 7.674a.535.535 0 0 1-.53-.53V3.44c0-.289.242-.53.53-.53h.795c.196 0 .368.113.46.275.178-.11.353-.174.466-.239.266-.154.402-.586.465-1.037.031-.225.048-.442.076-.623.014-.09.027-.17.064-.258a.353.353 0 0 1 .32-.235c.393 0 .715.154.92.39.206.235.302.53.354.822.084.478.052.883.036 1.172h1.6c.436 0 .796.358.796.793 0 .154-.044.27-.1.45-.056.181-.131.399-.215.632-.166.466-.364.994-.494 1.383a1.32 1.32 0 0 1-.24.459.724.724 0 0 1-.539.251H2.91a.774.774 0 0 1-.264-.049v.05c0 .288-.24.529-.529.529zm0-.53h.795V3.44h-.795zm1.588-.529h3.176c.07 0 .092-.014.138-.068a.913.913 0 0 0 .14-.282c.135-.405.333-.932.497-1.392.082-.23.156-.443.207-.61.052-.166.077-.316.077-.294a.259.259 0 0 0-.266-.264H5.004a.265.265 0 0 1-.266-.266c0-.312.068-.87-.015-1.344-.042-.236-.12-.435-.233-.564a.607.607 0 0 0-.378-.199c-.027.151-.045.409-.079.65-.069.493-.199 1.117-.726 1.422-.197.113-.387.18-.5.258-.114.078-.16.12-.16.307v2.38c0 .152.112.266.263.266z"
                  fill="#F6F5F2"
                />
              </svg>
            </div>
          </button>
          <button onClick={handleSave} className="hover:opacity-70">
            <div
              className={`bg-leery-lemon rounded-md p-1 ${
                isSaved ? "bg-red-500" : ""
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                id="turned-in-not"
              >
                <path
                  fill="#F6F5F2"
                  d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2zm0 15l-5-2.18L7 18V6c0-.55.45-1 1-1h8c.55 0 1 .45 1 1v12z"
                />
              </svg>
            </div>
          </button>
        </div>
      </div>
      <Notification
        isOpen={openModal}
        onClose={closeModal}
        title={titleMessage}
      >
        {message}
      </Notification>
      {/* <div className="flex">
      <div className="">
        <img src="/assets/like.png"/>
      </div>
      <div className="self-center">
        <img src="/assets/saved.png" />
      </div>
      </div> */}
      <div>
        <p className="font-medium text-5xl mb-5 max-lg:text-3xl">Ingredients</p>
        <div>
          <p>{detailRecipe.description}</p>
        </div>
      </div>
      <div className="flex flex-col items-center gap-y-3">
        <label className="self-start ml-32 max-md:ml-0">Comment</label>
        <textarea
          placeholder="Write your comment here..."
          className="w-3/4 max-md:w-full max-md:h-32 max-md:text-sm h-60 bg-gray-100 rounded-md resize-none outline-none p-5 font-normal"
        ></textarea>
      </div>
    </div>
  );
}
