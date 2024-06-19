import { Routes, Route } from "react-router-dom";
import TopBar from "./components /topbar/TopBar";
import HomePage from "./pages/home/Home";
import Register from "./pages/register/Register";
import Login from "./pages/login /Login";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import Settings from "./components /settings/Settings";
import { useContext } from "react";
import { Context } from "./context/Context";

function App() {
  const { user } = useContext(Context);
  return (
    <div>
      <TopBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/posts" element={<HomePage />} />
        <Route
          path="/register" // Removed the leading slash
          element={user ? <HomePage /> : <Register />}
        />
        {/* <Route path="/about" element={user ? <About /> : <Login />} /> */}
        <Route path="/post/:id" element={<Single />} />
        <Route path="/login" element={user ? <HomePage /> : <Login />} />
        <Route path="/write" element={user ? <Write /> : <Login />} />
        <Route path="/settings" element={user ? <Settings /> : <Login />} />
      </Routes>
    </div>
  );
}

export default App;
