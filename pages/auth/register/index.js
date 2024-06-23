import Link from "next/link";
import Button from "../../../components/base/button";
import Input from "../../../components/base/input";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Notification from "../../../components/module/modal";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../../configs/redux/actions/authActions";
import { Loading } from "../../../components/base/loading";

export default function Register() {
  // const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
  const [message, setMessage] = useState("");
  const [titleMessage, setTitleMessage] = useState("");
  const [openModal, setOpenModal] = useState(false);
  // const [error, setError] = useState(false);
  // const [isValidForm, setIsValidForm] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const {loading, error, user} = useSelector((state)=> state.auth)
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
    dispatch(register(data))
  };
  useEffect(() => {
    if (!loading) {
      if (error) {
        setTitleMessage("Register Failed");
        setMessage(error);
        setOpenModal(true);
      } else if (user.email) {
        setTitleMessage("Register Success");
        setMessage("You have successfully register.");
        setOpenModal(true);
      }
    }
  }, [loading, error, user]);
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
      <div className="h-screen w-1/2 flex flex-col justify-center items-center gap-3 max-lg:w-screen">
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
          <label className="text-gray-dark max-lg:text-xs max-lg:font-semibold">Name</label>
          <Input
            type="text"
            placeholder="your name"
            className="border-2 border-solid w-[426px] max-lg:text-xs max-lg:font-semibold max-md:w-[290px] h-9 focus:border-none focus:outline-leery-lemon"
            name="name"
            value={data.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="text-gray-dark max-lg:text-xs max-lg:font-semibold">Email Address</label>
          <Input
            type="email"
            placeholder="example@xxx.com"
            className="border-2 border-solid w-[426px] max-lg:text-xs max-lg:font-semibold max-md:w-[290px] h-9 focus:border-none focus:outline-leery-lemon"
            name="email"
            value={data.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="text-gray-dark max-lg:text-xs max-lg:font-semibold">Phone number</label>
          <Input
            type="text"
            placeholder="example@xxx.com"
            className="border-2 border-solid w-[426px] h-9 max-lg:text-xs max-lg:font-semibold max-md:w-[290px] focus:border-none focus:outline-leery-lemon"
            name="phone"
            value={data.phone}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="text-gray-dark max-lg:text-xs max-lg:font-semibold">Create new password</label>
          <Input
            type="password"
            placeholder="example@xxx.com"
            className="border-2 border-solid w-[426px] h-9 max-lg:text-xs max-lg:font-semibold max-md:w-[290px] focus:border-none focus:outline-leery-lemon"
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="text-gray-dark max-lg:text-xs max-lg:font-semibold">New Password</label>
          <Input
            type="password"
            placeholder="example@xxx.com"
            className="border-2 border-solid w-[426px] h-9 max-lg:text-xs max-lg:font-semibold max-md:w-[290px] focus:border-none focus:outline-leery-lemon"
            name="password"
            value={data.password}
            onChange={handleChange}
          />
        </div>
        <div className="flex gap-3 items-center self-start ml-40 max-lg:self-center max-lg:ml-0">
          <input
            type="checkbox"
            className="checkbox w-5 h-5 max-lg:w-4 max-lg:h-4 rounded-md appearance-none checked:bg-leery-lemon bg-white border border-gray-300"
            onChange={handleChange}
          />
          <label className="text-gray-dark max-lg:text-xs max-lg:font-semibold">
            I agree to terms & conditions
          </label>
        </div>
        <div>
          <Button
            onClick={handleSubmit}
            className=" w-[426px] h-9 disabled:opacity-25 max-lg:w-[290px] max-lg:h-10 flex justify-center items-center"
            disabled={!isValidForm}
          >
            {loading ? (
              <div>
                <Loading />{" "}
              </div>
            ) : (
              <>Register</>
            )}
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
