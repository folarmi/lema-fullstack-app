import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import QueryClientContextProvider from "./lib/QueryClientContextProvider";

import StoreProvider from "./lib/StoreProvider";
import { RoutePage } from "./utils/RoutePage";

function App() {
  return (
    <StoreProvider>
      <QueryClientContextProvider>
        <Router>
          <RoutePage />
        </Router>
      </QueryClientContextProvider>
    </StoreProvider>
  );
}

export default App;
