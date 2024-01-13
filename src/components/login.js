import React, { useState, useEffect } from "react";
import Logo from "../images/logo2.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LoginForm() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [columnsOrder, setColumnsOrder] = useState("row");
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    setIsRegistering(true);
    setColumnsOrder("row-reverse");
  };

  const handleBackToLogin = () => {
    setIsRegistering(false);
    setColumnsOrder("row");
  };

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");

  const handleEmail = (e) => {
    const email = e.target.value;
    const emailTest = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (email !== "" && emailTest.test(email)) {
      setEmail(email);
    }
  };

  const handlePassword = (e) => {
    const password = e.target.value;
    const passwordTest =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (passwordTest.test(password)) {
      setPassword(password);
    }
  };

  const handleRegistration = async (e) => {
    e.preventDefault();
    const emailTest = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const passwordTest =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (
      email == "" ||
      !emailTest.test(email) ||
      !passwordTest.test(password) ||
      password == ""
    ) {
      alert("Please fill in all fields correctly!");
      return;
    }
    const newUser = {
      fullName: fullName,
      email: email,
      password: password,
      role: "customer",
      phoneNumber: phoneNumber,
    };
    try {
      const response = await axios.post(
        `http://localhost:5000/users/register`,
        newUser
      );
      const data = response.data;
      console.log(data);
      setFullName("");
      setEmail("");
      setPassword("");
      handleBackToLogin();
    } catch (error) {
      console.log("Error while registering", error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:5000/users/login`, {
        email,
        password,
      });
      const userData = response.data;
      console.log(response.data);
      navigate("/");
      sessionStorage.setItem("authToken", userData.token);
    } catch (error) {
      if (error?.response?.data?.error) {
        alert(error.response.data.error);
      }
      console.error("Error while logging in:", error);
    }
  };

  return (
    <section className="gradient-form h-screen px-4 flex justify-center items-center bg-#CEF3E7">
      <div className="container h-full p-20">
        <div className="g-6 flex h-full flex-wrap items-center justify-center text-black">
          <div className="w-full pb-10">
            <div
              className={`block rounded-lg bg-white shadow-lg lg:flex lg:flex-wrap`}
              style={{
                flexDirection: columnsOrder,
                background: isRegistering ? "#FFFFFF" : "#5FD3AA",
              }}
            >
              <div className="px-4 md:px-0 lg:w-6/12">
                <div className="md:mx-6 md:p-8">
                  <div className="text-center">
                    <img className="mx-auto w-100 " src={Logo} alt="logo" 
                    style={{
                      background: "#5FD3AA"
                    }}/>
                    <h4 className="mb-12 mt-1 pb-1 text-2xl font-semibold">
                      Welcome to your Diet Site!
                    </h4>
                  </div>

                  <form>
                    <p className="mb-4">
                      {isRegistering
                        ? "Register now"
                        : "Please login to your account"}
                    </p>
                    {!isRegistering && (
                      <>
                        <div className="relative mb-4">
                          <input
                            type="email"
                            className="peer block min-h-[auto] w-full rounded border border-gray-300 bg-white px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear shadow-text-black text-black"
                            id="exampleFormControlInput1"
                            placeholder="Email"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                        </div>
                        <div className="relative mb-4">
                          <input
                            type="password"
                            className="peer block min-h-[auto] w-full rounded border border-gray-300 bg-white px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear shadow-text-black text-black"
                            id="exampleFormControlInput11"
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                          />
                        </div>
                      </>
                    )}
                    {isRegistering && (
                      <>
                        <div className="relative mb-4">
                          <input
                            type="text"
                            className="peer block min-h-[auto] w-full rounded border border-gray-300 bg-white px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear shadow-text-black text-black"
                            id="fullNameInput"
                            placeholder="Full Name"
                            onChange={(e) => setFullName(e.target.value)}
                            required
                          />
                        </div>
                        <div className="relative mb-4">
                          <input
                            type="email"
                            className="peer block min-h-[auto] w-full rounded border border-gray-300 bg-white px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear shadow-text-black text-black"
                            id="emailInput"
                            placeholder="Email"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                        </div>
                        <div className="relative mb-4">
                          <input
                            type="password"
                            className="peer block min-h-[auto] w-full rounded border border-gray-300 bg-white px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear shadow-text-black text-black"
                            id="passwordInput"
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                          />
                        </div>
                    
                        <div className="relative mb-4">
                          <input
                            type="text"
                            className="peer block min-h-[auto] w-full rounded border border-gray-300 bg-white px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear shadow-text-black text-black"
                            placeholder="Phone Number"
                            onChange={(e) => setphoneNumber(e.target.value)}
                            required
                          />
                        </div>
                      </>
                    )}
                    <div className="mb-12 pb-1 pt-8 text-center">
                      <button
                        className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-l font-bold uppercase leading-normal text-black shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                        type="button"
                        data-te-ripple-init
                        data-te-ripple-color="light"
                        style={{
                          background: "#5FD3AA",
                        }}
                        onClick={
                          isRegistering
                            ? (e) => handleRegistration(e)
                            : (e) => handleLogin(e)
                        }
                      >
                        {isRegistering ? "Register Now" : "Log in"}
                      </button>
                    </div>
                    <div className="flex items-center justify-between pb-6">
                      <p className="mb-0 mr-2">
                        {!isRegistering
                          ? "Don't have an account?"
                          : "Already have an account?"}
                      </p>
                      <button
                        type="button"
                        className="inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700"
                        data-te-ripple-init
                        data-te-ripple-color="light"
                        style={{
                          background: "#5FD3AA",
                        }}
                        onClick={
                          isRegistering
                            ? handleBackToLogin
                            : handleRegisterClick
                        }
                      >
                        {!isRegistering ? "Register" : "Back to Login"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div
                className="flex items-center rounded-b-lg lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-none"
                style={{ background: isRegistering ? "#5FD3AA" : "#CEF3E7" }}
              >
                <div className="px-4 py-6 text-black md:mx-6 md:p-12">
                  <h4 className="mb-6 text-3xl font-semibold">
                    We are more than just a service
                  </h4>
                  <p className="text-xl">
                    Here at My Diet Site, you get FREE access to our programs with the help of professional dietitian online and get your own meal plan. We as diet online based business urge you to become a member of our family and become a role model.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginForm;
