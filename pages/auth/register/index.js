import Link from "next/link";
import Button from "../../../components/base/button";
import Input from "../../../components/base/input";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Notification from "../../../components/module/modal";

export default function Register() {
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
    name: "",
    phone: "",
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
    // setIsValidForm(
    //   data.email.trim() !== "" && data.password.trim() !== "" && !isChecked
    // );
  };
  const isValidForm =
    data.email.trim() !== "" &&
    data.password.trim() !== "" &&
    data.name.trim() !== "" &&
    data.phone.trim() !== "" &&
    isChecked;
  const handleSubmit = () => {
    axios
      .post(`${baseURL}/auth/register`, {
        email: data.email,
        password: data.password,
        name: data.name,
        phone: data.phone,
      })
      .then((res) => {
        console.log(res.data.message);
        setMessage("Congratulations you have successfully register");
        setTitleMessage("Success");
        setOpenModal(true);
        // router.push('/')
      })
      .catch((err) => {
        console.log("Error: ", err);
        setError(true);
        setMessage(err.response.data.message);
        setTitleMessage("Log in Failed");
        setOpenModal(true);
      });
  };
  const closeModal = () => {
    if (error) {
      setOpenModal(false);
      router.push("/auth/register");
    } else {
      setOpenModal(false);
      router.push("/auth/login");
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
      <div className="h-screen w-1/2 flex flex-col justify-center items-center gap-3">
        <div>
          <p className="text-leery-lemon text-3xl font-semibold">
            Let’s Get Started !
          </p>
        </div>
        <div>
          <p className="text-gray-light">
            Create new account to access all features
          </p>
        </div>
        <div>
          <label className="text-gray-dark">Name</label>
          <Input
            type="text"
            placeholder="your name"
            className="border-2 border-solid w-[426px] focus:border-none focus:outline-leery-lemon"
            name="name"
            value={data.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="text-gray-dark">Email Address</label>
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
          <label className="text-gray-dark">Phone number</label>
          <Input
            type="text"
            placeholder="example@xxx.com"
            className="border-2 border-solid w-[426px] focus:border-none focus:outline-leery-lemon"
            name="phone"
            value={data.phone}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="text-gray-dark">Create new password</label>
          <Input
            type="password"
            placeholder="example@xxx.com"
            className="border-2 border-solid w-[426px] focus:border-none focus:outline-leery-lemon"
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="text-gray-dark">New Password</label>
          <Input
            type="password"
            placeholder="example@xxx.com"
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
            className=" w-[426px] h-10 disabled:opacity-25"
            disabled={!isValidForm}
          >
            Register
          </Button>
        </div>
        <Notification
          isOpen={openModal}
          onClose={closeModal}
          title={titleMessage}
        >
          {message}
        </Notification>
        <div className="flex">
          <p className="text-gray-dark">Already have account?</p>
          <Link href="/auth/login">
            <p className="text-leery-lemon">Log in here</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
