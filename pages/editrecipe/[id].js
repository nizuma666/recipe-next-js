import axios from "axios";
import Button from "../../components/base/button";
import Input from "../../components/base/input";
import { GetTokenFromLocalStorage } from "../../services/GetToken";
import { useEffect, useState } from "react";
import Notification from "../../components/module/modal";
import { useRouter } from "next/router";
import { getCookie } from "cookies-next";

export default function EditRecipe() {
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [titleMessage, setTitleMessage] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false)
  const [recipe, setRecipe] = useState([])
  const [showUploadIcon, setShowUploadIcon] = useState(false);
  const { id } = router.query;
  const token = getCookie("token")
  const [data, setData] = useState({
    title: "",
    description: "",
    image: "",
  });
  useEffect(() => {
    if (!id) return;
    if (!token) {
      router.push("/auth/login");
      return;
    }
    const getrecipe = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/recipes/${id}`
        );
        setRecipe(response.data.data);
        setData(response.data.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    getrecipe();
  }, [id]);
  const handleChange = (e) => {
    setData({
      ...recipe,
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
      .put(`${baseURL}/recipes/${id}`, data, config)
      .then((res) => {
        setMessage("Congratulations you have successfully updated the recipe");
        setTitleMessage("Success");
        setOpenModal(true);
      })
      .catch((err) => {
        setError(true);
        console.log(data);
        setMessage(err.response.data.message);
        setTitleMessage("Failed to update recipes");
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
  // const handleRemoveImage = () => {
  //   setData({ ...data, image: '' });
  //   setShowUploadIcon(true);
  // };
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
          <label className="relative hover:opacity-65">
            <img src={data.image} alt="Recipe" className="w-full rounded-lg" />
            <input
              onChange={handleUploadImage}
              id="dropzone-file"
              type="file"
              className="hidden"
            />
          </label>
      </div>
      <div className="w-full md:w-2/3 lg:w-2/5">
        <Input
          onChange={handleChange}
          name="title"
          value={data.title}
          type="text"
          placeholder={recipe.title}
          className="border-2 border-solid w-full focus:border-none focus:outline-leery-lemon"
        />
      </div>
      <div className="w-full md:w-2/3 lg:w-2/5">
        <textarea
          onChange={handleChange}
          name="description"
          value={data.description}
          placeholder={data.description}
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
 )
}
