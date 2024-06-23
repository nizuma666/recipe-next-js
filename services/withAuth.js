import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { GetTokenFromLocalStorage } from "./GetToken";

const withAuth = (token) => {
  const router = useRouter();
  //   return (props) => {
  //     const router = useRouter();
  //     const token = GetTokenFromLocalStorage();

  //     useEffect(() => {
  //       if (!token) {
  //         router.push("/auth/login");
  //       }
  //     }, [token]);
  //     if (!token) {
  //       return null;
  //     }

  //     return <WrappedComponent {...props} />;
  //   };
//   const token = GetTokenFromLocalStorage();
  if (!token) {
    router.replace("/auth/login");
    return;
  }
};

export default withAuth;
