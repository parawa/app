import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layouts from "../Layout";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Space, Table, Tag } from "antd";
// import "./insert.css";
import "../../../src/index.css";
import { Row, Col } from "antd";
import {
  Box,
  TextField,
  Typography,
  ThemeProvider,
  Button,
} from "@mui/material";
import useCustomTheme from "../hooks/useCustomTheme";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";

const columns = [
  {
    title: "รหัสแปลงที่ดิน",
    dataIndex: "name",
    key: "name",
    // render: (text) => <a>{text}</a>,
  },

  {
    title: "ที่อยู่",
    dataIndex: "address",
    key: "address",
  },

  {
    title: "",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <Button style={{ color: "#6a5acd" }}>
          <EditOutlined /> แก้ไขข้อมูล
        </Button>
      </Space>
    ),
  },
  {
    title: "",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <Button style={{ color: "#ff0000" }}>
          <DeleteOutlined />
          ลบข้อมูล
        </Button>
      </Space>
    ),
  },
];
const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
];

function Search() {
  const { theme } = useCustomTheme();
  const App = () => <Table columns={columns} dataSource={data} />;
  const ComponentDemo = App;
  return (
    <ThemeProvider theme={theme}>
      <div className="otherSide" id="otherSide">
        <div>
          <Layouts />
        </div>
        <Box className="Box-title">
          <Typography className="text-font">ค้นหาข้อมูล</Typography>
        </Box>
        <Box className="content">
          <Row
            gutter={[24, 24]}
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            <Col>
              <TextField label="รหัสแปลงที่ดิน" />
            </Col>
            <Col>
              <Button
                style={{
                  height: "3rem",
                  backgroundColor: "#ffa500",
                }}
                variant="contained"
                type="submit"
              >
                <SearchIcon />
                ค้นหา
              </Button>
            </Col>
            <Col>
              <Button
                style={{
                  height: "3rem",
                  backgroundColor: "#3cb371",
                }}
                variant="contained"
                type="submit"
              >
                <AddIcon />
                เพิ่มแฟ้มเอกสาร
              </Button>
            </Col>
          </Row>
        </Box>
        <Box className="content">
          <Row style={{ justifyContent: "center" }}>
            <ComponentDemo />
          </Row>
        </Box>
      </div>
    </ThemeProvider>
  );
}

export default Search;
