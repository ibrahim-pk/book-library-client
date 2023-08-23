import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Layout } from "./Screen/Layout/Layout";
import Home from "./Screen/HomeScreen/Home";
// import { PrivateRouter } from "./Route/PrivateRouter";
import Login from "./Screen/UserScreen/Login";
import Register from "./Screen/UserScreen/Register";
import Manage from "./Screen/Manage/Manage";
import { PrivateRouter } from "./Route/PrivateRouter";
import WishList from "./Screen/WishList/WishList";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />

        <Route
          path="/user/login"
          element={
            <Layout>
              <Login />
            </Layout>
          }
        />
        <Route
          path="/user/register"
          element={
            <Layout>
              <Register />
            </Layout>
          }
        />

        <Route
          path="/user/manage"
          element={
            <Layout>
              <PrivateRouter>
                <Manage />
              </PrivateRouter>
            </Layout>
          }
        />
        <Route
          path="/wishlist"
          element={
            <Layout>
              <PrivateRouter>
                <WishList />
              </PrivateRouter>
            </Layout>
          }
        />
      </Routes>
    </>
  );
}

export default App;
