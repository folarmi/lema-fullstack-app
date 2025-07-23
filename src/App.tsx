import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import QueryClientContextProvider from "./lib/QueryClientContextProvider";

import StoreProvider from "./lib/StoreProvider";
import { RoutePage } from "./utils/RoutePage";
import { Bounce, ToastContainer } from "react-toastify";

function App() {
  return (
    <StoreProvider>
      <QueryClientContextProvider>
        <Router>
          <ToastContainer
            position="top-center"
            pauseOnHover
            hideProgressBar
            transition={Bounce}
            closeButton={false}
            closeOnClick
            autoClose={5000}
          />
          <RoutePage />
        </Router>
      </QueryClientContextProvider>
    </StoreProvider>
  );
}

export default App;
