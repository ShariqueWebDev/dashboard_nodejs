import React, { useState, useEffect } from "react";
import { Button, Upload, Form, Table } from "antd";
import { BiUpload } from "react-icons/bi";
import SwiperSlider from "../components/Swiper";
import { BASE_URL } from "../utils/baseUrl";
import { MdDeleteOutline } from "react-icons/md";
import Swal from "sweetalert2";

const UploadImage = () => {
  const [fileList, setFileList] = useState();
  const [imageData, setImageData] = useState([]);

  useEffect(() => {
    getImagefromApi();
  }, []);

  const getImagefromApi = async () => {
    const res = await fetch(`${BASE_URL}/api/image/getimage`);
    if (res.ok) {
      const data = await res.json();
      setImageData(data?.data);
      console.log(data?.data);
    } else {
      console.log("data could not fetch in frontend side");
    }
  };
  console.log(imageData);

  const deleteDataFromApi = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/api/image/delete `, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      if (response.ok) {
        Swal.fire({
          title: "User has been Deleted!",
        });
      }
    } catch (error) {
      console.log("frontend delete api failed!");
    }
  };

  const column = [
    {
      key: "1",
      title: "ID",
      dataIndex: "id",
    },
    {
      key: "2",
      title: "PATH",
      dataIndex: "image_path",
    },
    {
      key: "3",
      title: "ACTION",
      render: (_, record) => {
        return (
          <MdDeleteOutline
            size={16}
            style={{ color: "red", marginLeft: "20px" }}
            onClick={() => {
              deleteDataFromApi(record.id);
              handleDeleteImage(record);
            }}
          />
        );
      },
    },
  ];

  const handleDeleteImage = (record) => {
    const newData = imageData.filter((img) => img?.id !== record?.id);
    setImageData(newData);
  };

  const onFinish = async (value) => {
    console.log(value);
    const formData = new FormData();
    formData.append("image_file", value.picture.fileList[0].originFileObj);
    const res = await fetch("http://localhost:5000/api/image/upload", {
      method: "POST",
      body: formData,
    });
    if (res.ok) {
      console.log("Success");
      setFileList([]);
      Swal.fire({
        title:"Image uploaded ",
        
      })
      getImagefromApi()
    }
  };

  return (
    <div className="mt-[50px] ">
          <h1 className=" ml-6 text-[30px] mb-5">Add Image</h1>
      <div className="flex justify-center items-center">
        <div className="max-w-[750px] w-full rounded-2xl border pt-4">
          <Form
            onFinish={onFinish}
            className="text-center "
          >
            <Form.Item
              name={"picture"}
              rules={[
                {
                  required: true,
                  message: "Please upload Image",
                },
              ]}
            >
              <Upload className="" fileList={fileList} beforeUpload={true}>
                <Button icon={<BiUpload size={22} />} size={"large"}>
                  Upload Image
                </Button>
              </Upload>
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit">Save</Button>
            </Form.Item>
          </Form>
        </div>
      </div>
      <div className="text-[30px] ml-6 mb-0 mt-6">Images</div>
      <div className="flex justify-center items-center">
        <SwiperSlider imageData={imageData} />
      </div>

      <div className="mt-[50px]">
        <h3 className="text-[30px] ml-6">Image Details</h3>
        <Table columns={column} dataSource={imageData} className="ml-[10px]" />
      </div>
    </div>
  );
};

export default UploadImage;
