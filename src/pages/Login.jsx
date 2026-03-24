import React, { useState } from "react";
import "./login.css";
import Header from "../components/Header";
import { useLocation, useNavigate } from "react-router-dom";
import Register from './Register';
import Transition from "../components/Transition";

const Login = () => {
  const params = useLocation();
  // console.log(params?.state?.navig);

  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("user");
  // const navigate = userouteHandler();

  // User state
  const [userUsername, setUserUsername] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userError, setUserError] = useState("");

  const reg = () => {
    routeHandler('/register');
  }

  // Admin state
  const [adminUsername, setAdminUsername] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [adminError, setAdminError] = useState("");

  // User login submit
  const handleUserSubmit = async (e) => {
    e.preventDefault();
    if (!userUsername || !userPassword) {
      setUserError("Please fill in both fields.");
      return;
    }

    try {
      const res = await fetch("https://nodejs-production-42f2.up.railway.app/loginUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: userUsername, password: userPassword }),
      });

      const data = await res.json();


      if (data.success) {
        setUserError("");

        sessionStorage.setItem("username", userUsername);
        console.log(sessionStorage.getItem("username"));
        alert("User logged in successfully!");
        if (params?.state?.navig == 'explore') {
          routeHandler('/explore');
        } else {
          routeHandler('/user');
        }



      } else {
        setUserError("Invalid username or password.");
      }
    } catch (err) {
      setUserError("Server error. Try again later.");
    }
  };

  // Admin login submit
  const handleAdminSubmit = async (e) => {
    e.preventDefault();
    if (!adminUsername || !adminPassword) {
      setAdminError("Please fill in both fields.");
      return;
    }

    try {
      const res = await fetch("https://nodejs-production-42f2.up.railway.app/loginAdmin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: adminUsername, password: adminPassword }),
      });

      const data = await res.json();

      if (data.success) {
        setAdminError("");
        sessionStorage.setItem("admin", adminUsername);
        alert("Admin logged in successfully!");
        routeHandler('/admin');
      } else {
        setAdminError("Invalid admin username or password.");
      }
    } catch (err) {
      setAdminError("Server error. Try again later.");
    }
  };

  const [out, setOut] = useState(false);
  const [mpath, setMpath] = useState("");
  const routeHandler = (path, e = null) => {
    if (e) { e.preventDefault(); }
    setMpath(path);
    setOut(true);
  }

  return (
    <>
      <Header />
      <div className="loginPageUnique">

        <div className="loginWrapperUnique">


          <div className="loginTabsUnique flex gap-5">
            <div
              id="userTabUnique"
              className={`loginTabUnique w-1/2 ${activeTab === "user" ? "activeTabUnique" : ""}` + ''}
              onClick={() => setActiveTab("user")}
            >
              User
            </div>
            <div
              id="adminTabUnique"
              className={`loginTabUnique w-1/2 ${activeTab === "admin" ? "activeTabUnique" : ""}` + ''}
              onClick={() => setActiveTab("admin")}
            >
              Admin
            </div>
          </div>

          {activeTab === "user" && (
            <form id="userFormUnique" className="loginFormUnique" onSubmit={handleUserSubmit}>
              <h1>User Login</h1>
              <div className="loginInputGroupUnique">
                <label>Username</label>
                <input
                  type="text" className="border"
                  placeholder="Enter your Username"
                  value={userUsername}
                  onChange={(e) => setUserUsername(e.target.value)}
                />
              </div>
              <div className="loginInputGroupUnique">
                <label>Password</label>
                <input
                  type="password"
                  className="border"
                  placeholder="Enter your password"
                  value={userPassword}
                  onChange={(e) => setUserPassword(e.target.value)}
                />
              </div>
              {userError && <p className="loginErrorUnique">{userError}</p>}
              <button type="submit" className="loginBtnUnique">Login</button>
            </form>
          )}

          {activeTab === "admin" && (
            <form id="adminFormUnique" className="loginFormUnique" onSubmit={handleAdminSubmit}>
              <h1>Admin Login</h1>
              <div className="loginInputGroupUnique">
                <label>Username</label>
                <input
                  type="text" className="border"
                  placeholder="Enter admin username"
                  value={adminUsername}
                  onChange={(e) => setAdminUsername(e.target.value)}
                />
              </div>
              <div className="loginInputGroupUnique">
                <label>Password</label>
                <input
                  type="password" className="border"
                  placeholder="Enter admin password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                />
              </div>
              {adminError && <p className="loginErrorUnique">{adminError}</p>}
              <button type="submit" className="loginBtnUnique">Login</button>
            </form>
          )}
          <div className="flex justify-center"><p className="mt-3 hover:text-amber-500 w-fit " onClick={reg}>New User ? Then Register First!!!!</p></div>

        </div>
      </div>
      <div className='relative w-full h-full bg-amber-50'>
        <Transition out={out} path={mpath} />
      </div>
    </>
  );
};

export default Login;
