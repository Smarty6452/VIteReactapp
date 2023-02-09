import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./components/authentication/Auth";
import SecondPage from "./components/home/SecondPage";
import Nav from "./components/Navbar/Nav";

function App() {
  return (
    <>
      <Nav />
      <Router>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/second-page" element={<SecondPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
