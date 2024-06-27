import React, { useState } from "react";
import { Form, Button, Input, Space } from "antd";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Sign_Up = () => {
  const onFinish = async (value) => {
    try {
      const response = await fetch("http://localhost:5000/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(value),
      });

      if (response.ok) {
        const signupData = response.json();
        console.log("user has been created");
        Swal.fire({
          title: "success alert!",
          text: "registration complete",
          timer: 2000,
        });
        // localStorage.setItem("credentials", JSON.stringify(signupData));
      }
    } catch (error) {}

    // setMoreData.push(value)
    // localStorage.setItem("credentials", JSON.stringify(setMoreData))
  };

  return (
    <div className="flex justify-center items-center">
      <div className="max-w-[400px] w-full my-5 mx-2 p-6 rounded-xl  bg-white shadow-2xl">
        <h2 className=" text-[35px] font-semibold text-center mb-6 max-md:text-[25px] ">
          Sign Up
        </h2>
        <div className="">
          <Form onFinish={onFinish} className="max-w-sm mx-auto">
            <div className="mb-5">
              <Space className="hidden">
                <Form.Item
                  name={"firstname"}
                  rules={[
                    {
                      required: true,
                      message: "First name required",
                    },
                    {
                      min: 4,
                      message: "First name should be atleast 4 character",
                    },
                  ]}
                >
                  <Input className="" placeholder="First Name" />
                </Form.Item>
                <Form.Item
                  name={"lastname"}
                  rules={[
                    {
                      required: true,
                      message: "Last name is required",
                    },
                    {
                      min: 4,
                      message: "Last name should be atleast 4 character",
                    },
                  ]}
                >
                  <Input className="" placeholder="Last Name" />
                </Form.Item>
              </Space>
              <div className="min-[640px]:hidden">
                <Form.Item
                  name={"firstname"}
                  rules={[
                    {
                      required: true,
                      message: "First name is required",
                    },
                    {
                      min: 4,
                      message: "First name should be atleast 4 character",
                    },
                  ]}
                >
                  <Input className="" placeholder="First Name" />
                </Form.Item>
                <Form.Item
                  name={"lastname"}
                  rules={[
                    {
                      required: true,
                      message: "Last name is required",
                    },
                    {
                      min: 4,
                      message: "Last name should be atleast 4 character",
                    },
                  ]}
                >
                  <Input className="" placeholder="Last Name" />
                </Form.Item>
              </div>
              <Form.Item
                name={"email"}
                rules={[
                  {
                    type: "email",
                    message: "Please input valid email!",
                  },
                  {
                    required: true,
                    message: "Email is required",
                  },
                ]}
              >
                <Input className="" placeholder="Email" />
              </Form.Item>
              <Form.Item
                name={"password"}
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
                <Input.Password type={"password"} placeholder="Password" />
              </Form.Item>
            </div>
            <div className="mb-5">
              <Form.Item
                name={"confirmpassword"}
                dependencies={["password"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please confirm your password",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("Confirm password do not match!")
                      );
                    },
                  }),
                ]}
              >
                <Input.Password placeholder="input password" />
              </Form.Item>
            </div>

            <Button
              htmlType="submit"
              className="w-full bg-[#4096ff]"
              type="primary"
            >
              Sign Up
            </Button>
          </Form>
          <p className="text-center text-[14px] mt-2 text-gray-500">
            Already have an account?{" "}
          </p>
          <div className="my-5">
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
            <p className="text-center my-2 text-slate-500">Or</p>
            <Link to="/login">
              <Button type="primary" className="w-full bg-[#4096ff] ">
                Login
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sign_Up;
