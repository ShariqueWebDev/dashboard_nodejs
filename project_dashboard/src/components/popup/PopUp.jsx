import { Button, Form, Input } from "antd";
import React from "react";
import { MdClose } from "react-icons/md";

const PopUp = ({ setShow, show, popUpData, setPopUpData }) => {
  const onFinish = (value) => {
    console.log(value);
    // setPopUpData(value);
  };

  return (
    <div className="absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] bg-white">
      {show && (
        <div className="w-[500px] border p-8 rounded-lg">
          <h1 className="my-4 text-[25px] font-semibold">Edit your Porfile</h1>
          <Form onFinish={onFinish}>
           
            <Form.Item>
              <Button htmlType="submit">Update</Button>
            </Form.Item>
          </Form>
          <div className="absolute top-5 right-5 cursor-pointer">
            <MdClose
              set
              size={20}
              onClick={() => {
                setShow(false);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PopUp;
