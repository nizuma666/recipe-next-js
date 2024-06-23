import Link from "next/link";
import Button from "../../../components/base/button";
import Input from "../../../components/base/input";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Notification from "../../../components/module/modal";
import { useDispatch, useSelector } from "react-redux";
import { Loading } from "../../../components/base/loading";
import { login } from "../../../configs/redux/actions/authActions";

export default function Login() {
  const [message, setMessage] = useState("");
  const [titleMessage, setTitleMessage] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const { loading, error, user } = useSelector((state) => state.auth);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { type, checked, name, value } = e.target;
    if (type === "checkbox") {
      setIsChecked(checked);
    } else {
      setData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const isValidForm =
    data.email.trim() !== "" && data.password.trim() !== "" && isChecked;

  const handleSubmit = () => {
    if (isValidForm) {
      dispatch(login(data));
    } else {
      setTitleMessage("Form Invalid");
      setMessage("Please fill in all fields and accept the terms.");
      setOpenModal(true);
    }
  };

  useEffect(() => {
    if (!loading) {
      if (error) {
        setTitleMessage("Login Failed");
        setMessage(error);
        setOpenModal(true);
      } else if (user.email) {
        setTitleMessage("Login Success");
        setMessage("You have successfully logged in.");
        setOpenModal(true);
      }
    }
  }, [loading, error, user]);

  const closeModal = () => {
    setOpenModal(false);
    if (error) {
      router.push("/auth/login");
    } else {
      router.push("/");
    }
  };
  const handleLogo = () => {
    router.push("/")
  }
  return (
    <div className="w-screen flex max-lg:justify-center">
      <div className="bg-bg-login h-screen w-1/2 max-lg:hidden">
        <div className="bg-leery-lemon bg-opacity-70 h-screen p-64 box-border">
          <button onClick={handleLogo}>
            <img src="/assets/logo.png" width={150} height={150} />
          </button>
        </div>
      </div>
      <div className="h-screen w-1/2 flex flex-col justify-center items-center gap-7 max-md:gap-3 max-lg:w-screen">
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
            className="border-2 border-solid w-[426px] max-md:w-[290px] max-lg:h-12 focus:border-none focus:outline-leery-lemon"
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
            className="border-2 border-solid w-[426px] max-md:w-[290px] max-lg:h-12 focus:border-none focus:outline-leery-lemon"
            name="password"
            value={data.password}
            onChange={handleChange}
          />
        </div>
        <div className="flex gap-x-3 items-center self-start ml-44 max-lg:self-center max-lg:ml-0">
          <input
            type="checkbox"
            className="checkbox w-4 h-4 rounded-md appearance-none checked:bg-leery-lemon bg-white border border-gray-300"
            onChange={handleChange}
          />
          <label className="text-gray-dark text-xs">
            I agree to terms & conditions
          </label>
        </div>
        <div>
          <Button
            onClick={handleSubmit}
            className=" w-[426px] disabled:opacity-25 max-lg:w-[290px] max-lg:h-12 flex justify-center items-center"
            disabled={!isValidForm}
          >
            {loading ? (
              <div>
                <Loading />{" "}
              </div>
            ) : (
              <>Log in</>
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
        <div className="self-center max-lg:mr-0">
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
