import Link from "next/link";
import Button from "../../../components/base/button";
import Input from "../../../components/base/input";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Notification from "../../../components/module/modal";

export default function Login() {
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
  const [message, setMessage] = useState("");
  const [titleMessage, setTitleMessage] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [error, setError] = useState(false);
  // const [isValidForm, setIsValidForm] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const router = useRouter();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { type, checked } = e.target;
    if (type === "checkbox") {
      setIsChecked(checked);
    } else {
      setData((prevData) => ({
        ...prevData,
        [e.target.name]: e.target.value,
      }));
    }
  };
  const isValidForm =
    data.email.trim() !== "" && data.password.trim() !== "" && isChecked;
  const handleSubmit = () => {
    axios
      .post(`${baseURL}/auth/login`, {
        email: data.email,
        password: data.password,
      })
      .then((res) => {
        setError(false);
        const { token, refreshToken } = res.data.data;
        localStorage.setItem("token", token);
        localStorage.setItem("refreshToken", refreshToken);
        setMessage("Congratulations you have successfully logged in");
        setTitleMessage("Success");
        setOpenModal(true);
        console.log(res.data.data);
      })
      .catch((err) => {
        setError(true);
        setMessage(err.response.data.message);
        setTitleMessage("Log in Failed");
        setOpenModal(true);
      });
  };
  const closeModal = () => {
    if (error) {
      setOpenModal(false);
      router.push("/auth/login");
    } else {
      setOpenModal(false);
      router.push("/");
    }
  };
  return (
    <div className="w-screen flex max-lg:justify-center">
      <div className="bg-bg-login h-screen w-1/2 max-lg:hidden">
        <div className="bg-leery-lemon bg-opacity-70 h-screen p-64 box-border">
          <Link href="/">
            <img src="/assets/logo.png" />
          </Link>
        </div>
      </div>
      <div className="h-screen w-1/2 flex flex-col justify-center items-center gap-7">
        <div>
          <p className="text-leery-lemon text-3xl font-semibold">Welcome</p>
        </div>
        <div>
          <p className="text-gray-light">Log in into your exiting account</p>
        </div>
        <div>
          <label className="text-gray-dark">Email</label>
          <Input
            type="email"
            placeholder="example@xxx.com"
            className="border-2 border-solid w-[426px] focus:border-none focus:outline-leery-lemon"
            name="email"
            value={data.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="text-gray-dark">Password</label>
          <Input
            type="password"
            placeholder="abcd1234"
            className="border-2 border-solid w-[426px] focus:border-none focus:outline-leery-lemon"
            name="password"
            value={data.password}
            onChange={handleChange}
          />
        </div>
        <div className="flex gap-3 items-center self-start ml-40">
          <input
            type="checkbox"
            className="checkbox w-5 h-5 rounded-md appearance-none checked:bg-leery-lemon bg-white border border-gray-300"
            onChange={handleChange}
          />
          <label className="text-gray-dark">
            I agree to terms & conditions
          </label>
        </div>
        <div>
          <Button
            onClick={handleSubmit}
            className=" w-[426px] disabled:opacity-25"
            disabled={!isValidForm}
          >
            Log in
          </Button>
        </div>
        <Notification
          isOpen={openModal}
          onClose={closeModal}
          title={titleMessage}
        >
          {message}
        </Notification>
        <div className="self-end mr-40">
          <p className="text-gray-dark text-xs font-semibold">
            Forgot Password ?
          </p>
        </div>
        <div className="flex">
          <p className="text-gray-dark">Don’t have an account?</p>
          <Link href="/auth/register">
            <p className="text-leery-lemon">Sign up</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
