import React, { useEffect, useState } from "react";
import axios from "../services/axios";
import { Table, Button, Input } from "antd";
import { useNavigate } from "react-router-dom";

interface VehicleCount {
  vehicleType: string;
  count: number;
  timestamp: string;
  _id: string;
}

const VehicleCountList: React.FC = () => {
  const [vehicleCounts, setVehicleCounts] = useState<VehicleCount[]>([]);
  const [filteredVehicleCounts, setFilteredVehicleCounts] = useState<
    VehicleCount[]
  >([]);
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVehicleCounts = async () => {
      try {
        const response = await axios.get("/vehicle-counts");
        const sortedData = response.data.sort(
          (a: VehicleCount, b: VehicleCount) =>
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );
        setVehicleCounts(sortedData);
        setFilteredVehicleCounts(sortedData);
      } catch (error) {
        console.error("Error fetching vehicle counts:", error);
      }
    };
    fetchVehicleCounts();
  }, []);

  const handleSearch = (value: string) => {
    setSearchText(value);
    const filteredData = vehicleCounts.filter((item) =>
      item.vehicleType.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredVehicleCounts(filteredData);
  };

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
      <Input
        placeholder="Search by vehicle type..."
        value={searchText}
        onChange={(e) => handleSearch(e.target.value)}
        style={{ marginBottom: "10px", width: "300px" }}
      />
      <Table
        dataSource={filteredVehicleCounts}
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
