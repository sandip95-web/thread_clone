import { BrowserRouter, Route, Routes } from "react-router-dom";
import Loading from "./components/common/Loading";
import Home from "./pages/Protected/Home";
import { FC, lazy, Suspense } from "react";
import Header from './components/Header'

const User = lazy(() => import("./pages/User"));
const Contact = lazy(() => import("./pages/Contact"));
const App: FC = () => {
  return (
    <div>
      <BrowserRouter>
        <Suspense fallback={<Loading />}>
        <Header/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/user" element={<User />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
};

export default App;
