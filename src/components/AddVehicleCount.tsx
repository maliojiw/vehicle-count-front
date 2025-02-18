import React from "react";
import {
  Input,
  Button,
  Form,
  DatePicker,
  InputNumber,
  notification,
} from "antd";
import axios from "../services/axios";
import { useNavigate } from "react-router-dom";

const AddVehicleCount: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleSubmit = async (values: any) => {
    try {
      const newVehicleCount = {
        vehicleType: values.vehicleType,
        count: values.count,
        timestamp: new Date(values.timestamp),
      };

      const response = await axios.post("/vehicle-counts", newVehicleCount);

      if (response.status === 200) {
        notification.success({
          message: "Vehicle Count Added",
          description: "The vehicle count has been successfully added.",
          duration: 3,
        });

        form.resetFields();
      }
    } catch (error) {
      console.error("Error adding vehicle count:", error);
      notification.error({
        message: "Error",
        description:
          "There was an issue adding the vehicle count. Please try again.",
        duration: 3,
      });
    }
  };

  const resetForm = () => {
    form.resetFields();
  };

  return (
    <div>
      <h2>Add Vehicle Count</h2>
      <Form
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
        preserve={false}
      >
        <Form.Item
          label="Vehicle Type"
          name="vehicleType"
          rules={[
            { required: true, message: "Please input the vehicle type!" },
          ]}
        >
          <Input placeholder="Enter vehicle type" />
        </Form.Item>
        <Form.Item
          label="Count"
          name="count"
          rules={[
            { required: true, message: "Please input the vehicle count!" },
          ]}
        >
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          label="Timestamp"
          name="timestamp"
          rules={[{ required: true, message: "Please select the timestamp!" }]}
        >
          <DatePicker
            showTime
            style={{ width: "100%" }}
            format="YYYY-MM-DD HH:mm:ss"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
            Add Vehicle Count
          </Button>
        </Form.Item>
      </Form>
      <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
        <Button onClick={() => navigate("/")}>
          Back to Vehicle Count List
        </Button>
        <Button onClick={resetForm} type="default">
          Clear Form
        </Button>
      </div>
    </div>
  );
};

export default AddVehicleCount;
