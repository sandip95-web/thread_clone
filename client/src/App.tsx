import { BrowserRouter, Route, Routes } from "react-router-dom";
import Loading from "./components/common/Loading";
import Home from "./pages/Protected/Home";
import { FC, lazy, Suspense } from "react";
import Header from './components/Header'
import Error from "./pages/Error";
const User = lazy(() => import("./pages/User"));
const Contact = lazy(() => import("./pages/Contact"));
const Search = lazy(() => import("./pages/Protected/Search"));
const App: FC = () => {
  return (
    <div>
      <BrowserRouter>
        <Suspense fallback={<Loading />}>
        <Header/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/user" element={<User />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
};

export default App;
