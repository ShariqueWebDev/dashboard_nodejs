import React, { useState } from "react";
import { Button, Upload, Form } from "antd";
import { BiUpload } from "react-icons/bi";
import SwiperSlider from "../components/Swiper";

const UploadImage = () => {
  const [fileList, setFileList] = useState();

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
    }
  };

  return (
    <div className="mt-[50px]">
      <div className="">
        <h1 className=" ml-2 text-[30px] mb-5">Add Image</h1>
        <Form onFinish={onFinish} className="text-center">
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
      <div className="">
            <SwiperSlider/>
      </div>
    </div>
  );
};

export default UploadImage;
