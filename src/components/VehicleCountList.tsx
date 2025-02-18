import React, { useEffect, useState } from "react";
import axios from "../services/axios";
import { Table, Button } from "antd";
import { useNavigate } from "react-router-dom";

interface VehicleCount {
  vehicleType: string;
  count: number;
  timestamp: string;
  _id: string;
}

const VehicleCountList: React.FC = () => {
  const [vehicleCounts, setVehicleCounts] = useState<VehicleCount[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVehicleCounts = async () => {
      try {
        const response = await axios.get("/vehicle-counts");
        setVehicleCounts(response.data);
      } catch (error) {
        console.error("Error fetching vehicle counts:", error);
      }
    };
    fetchVehicleCounts();
  }, []);

  const columns = [
    {
      title: "Vehicle Type",
      dataIndex: "vehicleType",
      key: "vehicleType",
    },
    {
      title: "Count",
      dataIndex: "count",
      key: "count",
    },
    {
      title: "Timestamp",
      dataIndex: "timestamp",
      key: "timestamp",
      render: (timestamp: string) => new Date(timestamp).toLocaleString(),
    },
  ];

  const handleGoToDashboard = () => {
    navigate("/add-vehicle");
  };

  return (
    <div>
      <h2>Vehicle Counts</h2>
      <Table
        dataSource={vehicleCounts}
        columns={columns}
        rowKey="_id"
        pagination={false}
      />
      <Button
        type="primary"
        onClick={handleGoToDashboard}
        style={{ marginTop: "20px" }}
      >
        Test adding vehicle count
      </Button>
    </div>
  );
};

export default VehicleCountList;
