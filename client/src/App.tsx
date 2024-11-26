import { FC, lazy } from "react";


// Create a custom theme

const Register = lazy(() => import("./pages/Register"));
const App: FC = () => {
  return (
    <div>
      <Register/>
      {/* <BrowserRouter>
        <Suspense fallback={<Loading />}>
        <Header/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </Suspense>
      </BrowserRouter> */}
    </div>
  );
};

export default App;
