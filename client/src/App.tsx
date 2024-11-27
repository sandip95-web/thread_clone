import { Box } from "@mui/material";
import { FC, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedLayout from "./pages/Protected/ProtectedLayout";

// const Register = lazy(() => import("./pages/Register"));
const Search = lazy(() => import("./pages/Protected/Search"));
const Home = lazy(() => import("./pages/Protected/Home"));
const ProfileLayout = lazy(
  () => import("./pages/Protected/profile/ProfileLayout")
);
const Threads = lazy(() => import("./pages/Protected/profile/Threads"));
const Replies = lazy(() => import("./pages/Protected/profile/Replies"));
const Repost = lazy(() => import("./pages/Protected/profile/Repost"));
const SinglePost = lazy(() => import("./pages/Protected/SinglePost"));
const Register = lazy(() => import("./pages/Register"));
const App: FC = () => {
  return (
    <>
      <Box minHeight={"100vh"}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ProtectedLayout />}>
              <Route path="" element={<Home />} />
              <Route path="post/:id" element={<SinglePost />} />
              <Route path="search" element={<Search />} />
              <Route path="profile/" element={<ProfileLayout />}>
                <Route path="threads/:id" element={<Threads />} />
                <Route path="replies/:id" element={<Replies />} />
                <Route path="reposts/:id" element={<Repost />} />
              </Route>
            </Route>
            <Route path="/register" element={<Register/>}/>
          </Routes>
        </BrowserRouter>
      </Box>
    </>
  );
};

export default App;
