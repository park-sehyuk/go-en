import { useState } from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Header from "./components/Header";
import { MainPage, LoginPage, SignupPage } from "./pages";

import "./App.css";

const LayOut = () => {
  return (
    <div className="wrapper">
      <Header />
      <Outlet />
    </div>
  );
};

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<LayOut />} path="/">
            <Route element={<MainPage />} index />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
