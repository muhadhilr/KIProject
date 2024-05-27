import React, { useState } from "react";
import Input from "../elements/Input";
import Button from "../elements/Button";

const Login = () => {
  const [formData, setFormData] = useState({
    Email: "",
    Password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="h-screen flex items-center justify-center text-center">
      <div className="w-1/2">
        <form onSubmit={handleSubmit}>
          <h1 className="mb-5 text-3xl font-bold text-sky-500">Login Page</h1>
          <Input
            placeholder={"Masukkan Email"}
            type={"email"}
            name="Email"
            onChange={handleChange}
          >
            Email
          </Input>
          <Input
            placeholder={"Masukkan Password"}
            type={"password"}
            name="Password"
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
