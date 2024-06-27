import React, { useEffect, useState } from "react";

import { Button, Form, Input, Checkbox } from "antd";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  // console.log(navigate);
  // useEffect(() => {
  //   navigate("/clients");
  // }, []);

  const onFinish = async (value) => {
    try {
      const response = await fetch(`http://localhost:5000/user/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(value),
      });
      if (!response.ok) {
        throw new Error("error sign in")
      }

      const storeData = await response.json();
      localStorage?.setItem("userLogin", JSON?.stringify(storeData));
      console.log("data store in local storage");
      navigate("/");
      console.log("after navigate");
    } catch (error) {
      console.log(error.message);
    }
  };

  const getDataFromStorage = JSON.parse(localStorage.getItem("userLogin"));

  const homePageNavigation = () => {
    if (getDataFromStorage) {
      navigate("/");
    } else {
      console.log("some error occured!");
    }
  };

  return (
    <div className=" m-10 flex justify-center items-center">
      <div className="max-w-[400px] w-full mx-5 p-6 rounded-xl bg-white shadow-2xl">
        <h2 className=" text-[35px] font-semibold text-center mb-6 max-md:text-[25px] ">
          Login
        </h2>
        <div className="md:flex justify-center items-center my-2">
          {/* Login with Google Button */}
          <Button
            type="default"
            className="w-full flex items-center justify-center rounded-lg bg-white border border-gray-300 hover:border-gray-400 hover:text-gray-800 p-2"
            size="large"
          >
            <img
              src="/Google.webp"
              alt="Login with Google"
              className="w-5 mr-2"
            />
            <span className="font-bold text-gray-500 text-sm">
              Login with Google
            </span>
          </Button>
        </div>
        <div className="text-center my-4 text-gray-400">
          or login with email
        </div>
        <div className="">
          <Form onFinish={onFinish} className="max-w-sm mx-auto">
            <div className="mb-5">
              <Form.Item
                name="email"
                rules={[
                  {
                    type: "email",
                    message: "Please enter valid email",
                  },
                  {
                    required: true,
                    message: "Email is required",
                  },
                ]}
              >
                <Input placeholder="Enter Email" />
              </Form.Item>
            </div>
            <div className="mb-5">
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Password is required",
                  },
                  {
                    min: 6,
                    message: "Password should be atleast 6 character",
                  },
                ]}
              >
                <Input.Password type="password" placeholder="Enter Password" />
              </Form.Item>
            </div>
            <div className="flex items-start mb-5">
              <Form.Item className="flex items-center h-5">
                <Checkbox
                  id="remember"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 "
                />
              </Form.Item>
              <label
                for="remember"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Remember me
              </label>
            </div>
            <Button htmlType="submit" className="w-full bg-sky-600" type="">
              Login
            </Button>
          </Form>
          <p className="text-center m-3 text-[14px]">
            Not registered yet?{" "}
            <Link to={"/signup"}>
              <span className="text-blue-600 cursor-pointer">
                Create an account&#8599;
              </span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
