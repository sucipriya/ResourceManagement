import { BrowserRouter } from "react-router-dom";
import RoutePage from "./routes";
import "./App.scss";

function App() {
  return (
    <BrowserRouter>
      <RoutePage />
    </BrowserRouter>
  );
}

export default App;
