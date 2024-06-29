import React, { useEffect, useState } from "react";
import { MdDeleteOutline, MdModeEditOutline } from "react-icons/md";

import Login from "../components/Login";
import { Navigate } from "react-router-dom";
import { Form, Input, Modal, Table } from "antd";
import PopUp from "../components/popup/PopUp";

const Customers = () => {
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(false);
  const [editUser, setEditUser] = useState(null);

  const columns = [
    {
      key: "1",
      title: "ID",
      dataIndex: "id",
    },
    {
      key: "2",
      title: "FIRST NAME",
      dataIndex: "first_name",
    },
    {
      key: "3",
      title: "LAST NAME",
      dataIndex: "last_name",
    },
    {
      key: "4",
      title: "EMAIL",
      dataIndex: "email",
    },
    {
      key: "5",
      title: "Actions",
      render: (_, record) => {
        return (
          <>
            <div className="flex">
              <MdModeEditOutline
                size={16}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setShow(true);
                  handleEditUser(record);
                }}
              />
              <MdDeleteOutline
                size={16}
                style={{ color: "red", marginLeft: "20px", cursor: "pointer" }}
                onClick={() => {
                  onDeleteUser(record);
                }}
              />
            </div>
          </>
        );
      },
    },
  ];

  const handleEditUser = (record) => {
    setShow(true);
    setEditUser(record);
  };

  useEffect(() => {
    fetchUserData().then((i) => {
      setUsers(i?.data);
    });
  }, []);

  console.log(users);
  const getDatafromstore = JSON.parse(localStorage.getItem("userLogin"));

  const deleteUserData = async (id) => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/user/deleteuser",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ id }),
        }
      );
      if (response.ok) {
        console.log("user has been deleted!");
        deleteUser(id);
      }
    } catch (error) {
      console.log("user has not deleted");
    }
  };

  const postEditUserData = async (id, first_name, last_name, email) => {
    try {
      const response = await fetch("http://localhost:5000/api/user/edituser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, first_name, last_name, email }),
      });
      if (response.ok) {
        const data = await response.json();
        setUsers(data?.data)
        console.log(data, "dataaaa");
        console.log("user data has been updated");
      }
    } catch (error) {
      console.log("user data could not be update");
    }
  };

  const fetchUserData = async () => {
    const response = await fetch("http://localhost:5000/api/users");
    const getUser = await response.json();
    return getUser;
  };

  // Antd Delete function
  const onDeleteUser = (record) => {
    const newData = users.filter((user) => user.id !== record.id);
    setUsers(newData);
    deleteUserData(record?.id);
  };

  // delete users
  const deleteUser = (id) => {
    console.log(id);
    let items = [...users];
    items = items.filter((p) => p.id !== id);
    setUsers(items);
  };

  return (
    <div className="">
      {getDatafromstore ? (
        <div className="m-2 md:m-10 border mt-24 p-2 md:p-10 bg-white rounded-3xl">
          <Table columns={columns} dataSource={users} />
        </div>
      ) : (
        <Navigate to={"/login"} />
      )}
      {/* <PopUp popUpData={popUpData} setPopUpData={setPopUpData} setShow={setShow} show={show} /> */}
      <Modal
        title="Edit User"
        visible={show}
        okText="Update"
        onCancel={() => {
          setShow(false);
          setEditUser(null);
        }}
        onOk={() => {
          // setUsers((pre) => {
          //   return pre.map((user) => {
          //     if (user.id === editUser.id) {
          //       return editUser;
          //     } else {
          //       user;
          //     }
          //   });
          // });
          postEditUserData(
            editUser.id,
            editUser.first_name,
            editUser.last_name,
            editUser.email
          );
          setShow(false);
          setEditUser(null);
        }}
        okType="default"
      >
        <Form.Item
          rules={[
            {
              required: true,
              message: "first name field required",
            },
          ]}
        >
          <Input
            value={editUser?.first_name}
            onChange={(e) => {
              setEditUser((pre) => {
                return { ...pre, first_name: e.target.value };
              });
            }}
          />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: "last name field required",
            },
          ]}
        >
          <Input
            value={editUser?.last_name}
            onChange={(e) => {
              setEditUser((pre) => {
                return { ...pre, last_name: e.target.value };
              });
            }}
          />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Email field required",
            },
          ]}
        >
          <Input
            value={editUser?.email}
            onChange={(e) => {
              setEditUser((pre) => {
                return { ...pre, email: e.target.value };
              });
            }}
          />
        </Form.Item>
      </Modal>
    </div>
  );
};

export default Customers;

{
  /* {getDatafromstore ? (
  <div className="m-2 md:m-10 border mt-24 p-2 md:p-10 bg-white rounded-3xl">
    <div className="flex justify-between border">
      <div className="firstname  w-[100px]"> First Name</div>
      <div className="lastname  w-[100px]">Last Name</div>
      <div className="email  w-[220px]">Email</div>
      <div className="email  w-[100px]">Edit</div>
      <div className="email  w-[100px]">Delete</div>
    </div>
    {users?.map((item) => {
      console.log(item.id + " :Mapping Data");
      return (
        <div
          key={item.id}
          className="flex justify-between border-t-1 border-l-1 border-r-1 text-[13px] "
        >
          <div className="firstname text-[13px] w-[100px]">
            {item.first_name}{" "}
          </div>
          <div className="lastname  text-[13px] w-[100px]">
            {item.last_name}
          </div>
          <div className="email  text-[13px] w-[220px]">{item.email}</div>
          <div className="email w-[100px] pt-1 pl-1 cursor-pointer">
            {<FaRegEdit />}
          </div>
          <div className="email w-[100px] pt-1 pl-1 cursor-pointer">
            {
              <MdDelete
                onClick={() => {
                  deleteUserData(item.id);
                }}
              />
            }
          </div>
        </div>
      );
    })}
  </div>
) : (
  <Navigate to={"/login"} />
)} */
}

//
// useEffect(() => {
//   fetchUserData().then((i) => {
//     setUsers(i?.data);
//   });
// }, []);
