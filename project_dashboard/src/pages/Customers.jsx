import React, { useEffect, useState } from "react";
import { MdDeleteOutline, MdModeEditOutline } from "react-icons/md";
import { Button, Form, Input, Modal, Switch, Table } from "antd";
import { BASE_URL } from "../utils/baseUrl";
import Swal from "sweetalert2";

const Customers = () => {
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(false);
  const [form] = Form.useForm();

  const fetchUserData = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/users`);
      if (response.ok) {
        const data = await response.json();
        setUsers(data.data);
      } else {
        console.error("Failed To Fetch Data");
      }
    } catch (error) {
      console.error("Internal Server Error");
    }
  };

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
      title: "STATUS",
      dataIndex: "status",
      render: (status) => {
        if (status) {
          return <>Active</>;
        } else {
          return <>Inactive</>;
        }
      },
    },
    {
      key: "6",
      title: "ACCESS USER",
      dataIndex: "access_user",
      render: (access_user) => {
        if (access_user) {
          return <>Active</>;
        } else {
          return <>Inactive</>;
        }
      },
    },
    {
      key: "7",
      title: "ACTIONS",
      render: (_, record) => {
        return (
          <>
            <div className="flex">
              <MdModeEditOutline
                size={16}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setShow(true);
                  // handleEditUser(record);
                  form.setFieldsValue(record);
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

  useEffect(() => {
    fetchUserData();
  }, []);

  const getDatafromstore = JSON.parse(localStorage.getItem("userLogin"));

  const deleteUserData = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/api/user/deleteuser`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      if (response.ok) {
        Swal.fire({
          title: "User has been Deleted!",
        });
        deleteUser(id);
      }
    } catch (error) {
      console.log("user has not deleted");
    }
  };

  const handleCancel = () => {
    setShow(false);
    form.resetFields();
  };
  const postEditUserData = async (values) => {
    try {
      console.log(values);
      const { id, first_name, last_name, email, status, access_user } = values;
      const response = await fetch(`${BASE_URL}/api/user/edituser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          first_name,
          last_name,
          email,
          status,
          access_user,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        fetchUserData();
        handleCancel();
        Swal.fire({
          title: "User details has been Updated!",
        });
      }
    } catch (error) {
      console.log("user data could not be update");
    }
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
      {getDatafromstore?.userData?.access_user === true ? (
        <div className="m-2 md:m-10 border mt-24 p-2 md:p-10 bg-white rounded-3xl">
          <Table columns={columns} dataSource={users} />
        </div>
      ) : (
        <div className="flex justify-center items-center h-[100px] mt-[150px] font-semibold text-gray-500">
          Sorry ! You cannot access this page
        </div>
      )}
      <Modal
        title="Edit User"
        visible={show}
        okText="Update"
        onCancel={() => handleCancel()}
        footer={null}
      >
        <Form form={form} onFinish={postEditUserData}>
          <Form.Item name="id" className="hidden">
            <Input />
          </Form.Item>
          <Form.Item
            name="first_name"
            rules={[
              {
                required: true,
                message: "first name field required",
              },
            ]}
          >
            <Input
              onChange={(e) => {
                setEditUser((pre) => {
                  return { ...pre, first_name: e.target.value };
                });
              }}
            />
          </Form.Item>
          <Form.Item
            name="last_name"
            rules={[
              {
                required: true,
                message: "last name field required",
              },
            ]}
          >
            <Input
              onChange={(e) => {
                setEditUser((pre) => {
                  return { ...pre, last_name: e.target.value };
                });
              }}
            />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Email field required",
              },
            ]}
          >
            <Input
              onChange={(e) => {
                setEditUser((pre) => {
                  return { ...pre, email: e.target.value };
                });
              }}
            />
          </Form.Item>
          <Form.Item name="status" label="Status">
            <Switch className="bg-black" />
          </Form.Item>
          <Form.Item
            label="Access User"
            name="access_user"
            valuePropName="checked"
          >
            <Switch className="bg-black" />
          </Form.Item>
          <Form.Item>
            <Button
              className="bg-stone-900 text-white uppercase"
              htmlType="submit"
            >
              Update
            </Button>
          </Form.Item>
        </Form>
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
