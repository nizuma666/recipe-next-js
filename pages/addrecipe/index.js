import axios from "axios";
import Button from "../../components/base/button";
import Input from "../../components/base/input";
import { GetTokenFromLocalStorage } from "../../services/GetToken";
import { useEffect, useState } from "react";
import Notification from "../../components/module/modal";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { addRecipe } from "../../configs/redux/actions/recipeActions";
import { getCookie } from "cookies-next";

function AddRecipe() {
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [titleMessage, setTitleMessage] = useState("");
  const [openModal, setOpenModal] = useState(false);
  // const [error, setError] = useState(false);
  const [showUploadIcon, setShowUploadIcon] = useState(true);
  const token = getCookie("token")
  const dispatch = useDispatch();
  const { modal, error } = useSelector((state) => state.recipe);
  const [data, setData] = useState({
    title: "",
    description: "",
    image: "",
  });
  useEffect(()=>{
    if (!token) {
      router.push("/auth/login")
      return;
    }
  },[])
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = () => {
    dispatch(addRecipe(data, token));
    if (error == null) {
      setMessage("Congratulations you have successfully added the recipe");
      setTitleMessage("Success");
      setOpenModal(true);
    } else {
      setMessage(error);
      setTitleMessage("Failed to add recipes");
      setOpenModal(true);
    }
  };
  const handleUploadImage = (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    axios.post(`${baseURL}/upload`, formData).then((res) => {
      const { file_url } = res.data.data;
      setData({ ...data, image: file_url });
      setShowUploadIcon(false);
    });
  };
  const handleReuploadImage = () => {
    setData({ ...data, image: "" });
    setShowUploadIcon(true);
  };
  const closeModal = () => {
    if (error) {
      setOpenModal(false);
      //   router.push("/auth/login");
    } else {
      setOpenModal(false);
      router.push("/profile");
    }
  };
  return (
    <div className="flex flex-col items-center gap-y-8 mb-4 px-4 md:px-0">
      <div className="w-full md:w-2/3 lg:w-2/5">
      {data.image && (
          <div className="relative">
            <img src={data.image} alt="Recipe" className="w-full" />
            <button
              onClick={handleReuploadImage}
              className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-md"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="red"
              >
                <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm4.293 13.293l-1.414 1.414L12 13.414l-2.879 2.879-1.414-1.414L10.586 12 7.707 9.121l1.414-1.414L12 10.586l2.879-2.879 1.414 1.414L13.414 12l2.879 2.879z" />
              </svg>
            </button>
          </div>
        )}
        {showUploadIcon && (
          <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-solid rounded-lg cursor-pointer hover:bg-gray-100">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                id="image"
                width="64"
                height="64"
                fill="#CCCCCC"
              >
                <path d="M43,6H5A3,3,0,0,0,2,9V39a3,3,0,0,0,3,3H43a3,3,0,0,0,3-3V9A3,3,0,0,0,43,6ZM30.38,24.83,38,17.4l6,5.86V38.14ZM5,8H43a1,1,0,0,1,1,1V20.46l-5.3-5.18a1,1,0,0,0-1.4,0l-8.36,8.15L24.7,19.28a1,1,0,0,0-1.4,"></path>
              </svg>

              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG or GIF (MAX. 800x400px)
              </p>
            </div>
            <input
              onChange={handleUploadImage}
              id="dropzone-file"
              type="file"
              className="hidden"
            />
          </label>
        )}
      </div>
      <div className="w-full md:w-2/3 lg:w-2/5">
        <Input
          onChange={handleChange}
          name="title"
          value={data.title}
          type="text"
          placeholder="Title"
          className="border-2 border-solid w-full focus:border-none focus:outline-leery-lemon"
        />
      </div>
      <div className="w-full md:w-2/3 lg:w-2/5">
        <textarea
          onChange={handleChange}
          name="description"
          value={data.description}
          placeholder="Ingredients"
          className="border-2 border-solid w-full h-40 md:h-60 lg:h-[280px] focus:border-none focus:outline-leery-lemon rounded-md resize-none p-5"
        />
      </div>
      <div className="w-full md:w-2/3 lg:w-2/5">
        <Button onClick={handleSubmit} className="w-full">
          Submit
        </Button>
      </div>
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
export default AddRecipe