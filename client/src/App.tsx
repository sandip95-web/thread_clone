import { Box } from "@mui/material";
import { FC, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedLayout from "./pages/Protected/ProtectedLayout";


// const Register = lazy(() => import("./pages/Register"));
const Search = lazy(() => import("./pages/Protected/Search"));
const Home = lazy(() => import("./pages/Protected/Home"));
const App: FC = () => {
  return (
    <>
      <Box minHeight={"100vh"}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ProtectedLayout />}>
              <Route path="" element={<Home />} />
              <Route path="post/:id" element={<h1>Single Post</h1>} />
              <Route path="search" element={<Search />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Box>
    </>
  );
};

export default App;
