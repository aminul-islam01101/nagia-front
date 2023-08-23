import "@/styles/globals.scss";
import { Provider } from "react-redux";
import { store } from "../states/store/store";

export default function App({ Component, pageProps, ...rest }) {
  // const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
