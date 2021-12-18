import React from "react";
import { Route, Routes } from "react-router-dom";
import Loading from "./components/Loading";
import Wrapper from "./components/Wrapper";
import Dashboard from "./containers/Dashboard";

const Events = React.lazy(() => import("./containers/Events"));
const Event = React.lazy(() => import("./containers/Event"));
const Landing = React.lazy(() => import("./containers/Landing"));
const Login = React.lazy(() => import("./containers/Login"));

function App() {
  return (
    <Wrapper>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route
          path="/events/:id"
          element={
            <React.Suspense fallback={<Loading />}>
              <Event />
            </React.Suspense>
          }
        />
        <Route
          path="/events"
          element={
            <React.Suspense fallback={<Loading />}>
              <Events />
            </React.Suspense>
          }
        />
        <Route
          path="/landing"
          element={
            <React.Suspense fallback={<Loading />}>
              <Landing />
            </React.Suspense>
          }
        />
        <Route
          path="/login"
          element={
            <React.Suspense fallback={<Loading />}>
              <Login />
            </React.Suspense>
          }
        />
      </Routes>
    </Wrapper>
  );
}

export default App;
