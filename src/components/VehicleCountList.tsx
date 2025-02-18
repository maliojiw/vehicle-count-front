import React, { useEffect, useState } from "react";
import axios from "../services/axios";
import { Table, Button, Input, Select } from "antd";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

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
  const [selectedPeriod, setSelectedPeriod] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
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
        filterData(sortedData, searchText, selectedPeriod);
      } catch (error) {
        console.error("Error fetching vehicle counts:", error);
      }
    };
    fetchVehicleCounts();
  }, []);

  const filterData = (data: VehicleCount[], search: string, period: string) => {
    const now = new Date();
    const filtered = data.filter((item) => {
      const itemDate = new Date(item.timestamp);

      let isWithinPeriod = true;
      if (period === "24h")
        isWithinPeriod =
          now.getTime() - itemDate.getTime() <= 24 * 60 * 60 * 1000;
      else if (period === "7d")
        isWithinPeriod =
          now.getTime() - itemDate.getTime() <= 7 * 24 * 60 * 60 * 1000;
      else if (period === "30d")
        isWithinPeriod =
          now.getTime() - itemDate.getTime() <= 30 * 24 * 60 * 60 * 1000;

      const matchesSearch = item.vehicleType
        .toLowerCase()
        .includes(search.toLowerCase());

      return isWithinPeriod && matchesSearch;
    });

    setFilteredVehicleCounts(filtered);
  };

  const handleSearch = (value: string) => {
    setSearchText(value);
    filterData(vehicleCounts, value, selectedPeriod);
  };

  const handlePeriodChange = (value: string) => {
    setSelectedPeriod(value);
    filterData(vehicleCounts, searchText, value);
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

      <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
        <Input
          placeholder="Search by vehicle type..."
          value={searchText}
          onChange={(e) => handleSearch(e.target.value)}
          style={{ width: "300px" }}
        />

        <Select
          value={selectedPeriod}
          onChange={handlePeriodChange}
          style={{ width: "200px" }}
        >
          <Option value="all">All Time</Option>
          <Option value="24h">Last 24 Hours</Option>
          <Option value="7d">Last 7 Days</Option>
          <Option value="30d">Last 30 Days</Option>
        </Select>
      </div>

      <Table
        dataSource={filteredVehicleCounts}
        columns={columns}
        rowKey="_id"
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: filteredVehicleCounts.length,
          onChange: (page, pageSize) => {
            setCurrentPage(page);
            setPageSize(pageSize);
          },
        }}
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
