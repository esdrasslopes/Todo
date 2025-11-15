import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Header from "./components/Header";
import { useAuthContext } from "./contexts/AuthContext";

function App() {
  const { isAuthenticated } = useAuthContext();

  return (
    <div>
      {isAuthenticated && <Header />}
      <ToastContainer />
      <Outlet />
    </div>
  );
}

export default App;
