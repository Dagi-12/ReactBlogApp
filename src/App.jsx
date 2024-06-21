import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import PrivateLayout from "./components/layout/PrivateLayout";
import CategoryList from "./pages/category/CategoryList";
import PostList from "./pages/post/PostList";
import Profile from "./pages/Profile";
import Setting from "./pages/Setting";
import PublicLayout from "./components/layout/PublicLayout";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
function App() {
  return (
    <>
      <Routes>
        <Route element={<PrivateLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="category" element={<CategoryList />} />
          <Route path="posts" element={<PostList />} />
          <Route path="profile" element={<Profile />} />
          <Route path="setting" element={<Setting />} />
        </Route>
        <Route element={<PublicLayout />}>
          <Route path="signup" element={<SignUp />} />
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </>
  );
}
export default App;
