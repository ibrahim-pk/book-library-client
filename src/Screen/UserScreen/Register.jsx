import { useState } from "react";
import { useUserRegisterMutation } from "../../redux/user/userApi";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registerUser, { isError, isLoading, isSuccess }] =
    useUserRegisterMutation();

  const navigate = useNavigate();

  const handleSignup = async () => {
    console.log(isError, isLoading, isSuccess);
    const data = { fname, lname, email, password };
    const res = await registerUser(data);
    console.log(res);
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
    <div className="register-form">
      <div className="signup-container">
        <h2>Sign Up</h2>
        <input
          type="text"
          placeholder="First Name"
          value={fname}
          onChange={(e) => setFname(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lname}
          onChange={(e) => setLname(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleSignup}>Sign Up</button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;
