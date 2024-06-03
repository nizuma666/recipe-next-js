import Navbar from "./module/navbar";
import { useRouter } from "next/router";
// import Container from "./base/container";
import Footer from "./module/footer";
// import LandingSection from "./module/LandingSection";

export default function Layout({ children }) {
  const router = useRouter();
  // console.log(router);
  if (
    router.pathname === "/auth/login" ||
    router.pathname === "/auth/register"
  ) {
    return <main>{children}</main>;
  } else {
    return (
      <>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </>
    );
  }
}
