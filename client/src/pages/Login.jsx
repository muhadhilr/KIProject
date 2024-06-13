import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Input from "../elements/Input";
import Button from "../elements/Button";
import { jwtDecode } from 'jwt-decode';

const API_KEY = import.meta.env.VITE_APIKey;
const BASE_URL = import.meta.env.VITE_UrlAPI;

const Login = ({ setRole }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { email, password } = formData;
      const response = await axios.post(
        `${BASE_URL}/login`,
        { email, password },
        {
          headers: {
            "x-api-key": API_KEY,
          },
        }
      );
  
      const { token } = response.data;
      localStorage.setItem("token", token);
      const decodedToken = jwtDecode(token);
      // setRole(decodedToken.role);
  
      if (decodedToken.role === "manager") {
        navigate("/manager");
      } else if (decodedToken.role === "cashier") {
        navigate("/cashier");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };  

  return (
    <div className="h-screen flex items-center justify-center text-center">
      <div className="w-1/2">
        <form onSubmit={handleSubmit}>
          <h1 className="mb-5 text-3xl font-bold text-sky-500">Login Page</h1>
          <Input
            placeholder={"Masukkan Email"}
            type={"email"}
            name="email"
            onChange={handleChange}
          >
            Email
          </Input>
          <Input
            placeholder={"Masukkan Password"}
            type={"password"}
            name="password"
            onChange={handleChange}
          >
            Password
          </Input>
          <Button type="submit">Login</Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
