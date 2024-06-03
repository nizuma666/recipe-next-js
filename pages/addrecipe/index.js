import axios from "axios";
import Button from "../../components/base/button";
import Input from "../../components/base/input";
import { GetTokenFromLocalStorage } from "../../services/GetToken";
import { useState } from "react";
import Notification from "../../components/module/modal";
import { useRouter } from "next/router";

export default function AddRecipe() {
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [titleMessage, setTitleMessage] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [error, setError] = useState(false);
  const [showUploadIcon, setShowUploadIcon] = useState(true);
  const token = GetTokenFromLocalStorage();
  const [data, setData] = useState({
    title: "",
    description: "",
    image: "",
  });
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .post(`${baseURL}/recipes`, data, config)
      .then((res) => {
        setMessage("Congratulations you have successfully added the recipe");
        setTitleMessage("Success");
        setOpenModal(true);
      })
      .catch((err) => {
        setError(true);
        setMessage(err.response.data.message);
        setTitleMessage("Failed to add recipes");
        setOpenModal(true);
      });
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
    <div className="flex flex-col items-center gap-y-8 mb-4">
      <div className="w-2/5">
        {data.image && <img src={data.image} />}
        {showUploadIcon && (
          <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-solid rounded-lg cursor-pointer hover:bg-gray-100 ">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                id="image"
                width="64"
                height="64"
                fill="#CCCCCC"
              >
                <path d="M43,6H5A3,3,0,0,0,2,9V39a3,3,0,0,0,3,3H43a3,3,0,0,0,3-3V9A3,3,0,0,0,43,6ZM30.38,24.83,38,17.4l6,5.86V38.14ZM5,8H43a1,1,0,0,1,1,1V20.46l-5.3-5.18a1,1,0,0,0-1.4,0l-8.36,8.15L24.7,19.28a1,1,0,0,0-1.4,0L4,38.1V9A1,1,0,0,1,5,8ZM5,40H4.93L24,21.4,43,40H5Zm6-20a5,5,0,1,0-5-5A5,5,0,0,0,11,20Zm0-8a3,3,0,1,1-3,3A3,3,0,0,1,11,12Z"></path>
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
      <div className="w-2/5">
        <Input
          onChange={handleChange}
          name="title"
          value={data.title}
          type="text"
          placeholder="Title"
          className="border-2 border-solid w-full focus:border-none focus:outline-leery-lemon"
        />
      </div>
      <div className="w-2/5">
        <textarea
          onChange={handleChange}
          name="description"
          value={data.description}
          placeholder="Ingredients"
          className="border-2 border-solid w-full h-[280px] focus:border-none focus:outline-leery-lemon rounded-md resize-none p-5"
        />
      </div>
      <div className="w-2/5">
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
