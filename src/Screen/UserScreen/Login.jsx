/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";
import { useUserLoginMutation } from "../../redux/user/userApi";
import { ToastContainer, toast } from "react-toastify";
import { Link, useLocation, useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginUser, { isError, isLoading, isSuccess }] = useUserLoginMutation();

  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async () => {
    console.log(isError, isLoading, isSuccess);
    const data = { email, password };
    const res = await loginUser(data);
    const userToken = {
      token: res?.data?.token,
    };
    localStorage.setItem("book-user", JSON.stringify(userToken));
    setEmail("");
    setPassword("");
    toast(res?.data?.msg);
    setTimeout(() => {
      if (location.state && location.state.from) {
        navigate(location.state.from);
      } else {
        navigate("/");
      }
    }, 1000);
  };
  return (
    <div className="login-form">
      <div className="login-container">
        <h2>Login</h2>
        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
        <div className="text-center my-2">
          <h3>
            New User?{" "}
            <Link className="text-blue-800" to="/user/register">
              Register
            </Link>{" "}
          </h3>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
