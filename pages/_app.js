// import { Provider } from "react-redux";
import Layout from "/components/layout";
import "../styles/globals.css";
import { wrapper } from "../configs/store";

function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default wrapper.withRedux(App);
