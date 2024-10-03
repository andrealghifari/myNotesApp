import Notes from "./components/main/Notes";
import "./App.css";
import Login from "./components/login/Login";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes";

function App() {
  return (
    <Router>
      <div className="container">
        {/* <Notes /> */}
        {/* <Login /> */}
        <AppRoutes/>
      </div>
    </Router>
  );
}

export default App;
