import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layouts from "../Layout";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import axiosEPropertyFolder from '../../api/axios'
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

function Search() {
  const { theme } = useCustomTheme();
  const navigate = useNavigate()
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([])
  const [loading, setLoading] = useState(false)
  const [parcelCodeSearch, setParcelCodeSearch] = useState()

  const handleSearchFormSubmit = async (event) => {
    event.preventDefault()
    setLoading(true);
    await axiosEPropertyFolder({
      method: 'post',
      url: '/search',
      data: {
        parcelCodeSearch: parcelCodeSearch
      }
    }).then((response) => {
      response = response.data
      if (response.status === 'OK') {
        setData(response.data);
      }
    })
    setLoading(false);
  }
  useEffect(() => {
    setColumns([
      {
        title: "รหัสแปลงที่ดิน",
        dataIndex: 'รหัสแปลงที่ดิน',
        width: 400,
        render: (_, record) => <a>{record.parcel_code}</a>,
      },
      {
        title: "ประเภทเอกสาร",
        width: 400,
        render: (_, record) => <a>{record.type}</a>,
      },
   
      {
        // field: 'Parcel Code',
        // title: "รหัสแปลงที่ดิน",
        width: 400,
        render: (_, record) => (
          <Space size="middle">
            <Button style={{ color: "#6a5acd" }}>
              <EditOutlined /> แก้ไขข้อมูล
            </Button>
          </Space>
        ),
      },
      {
        width: 400,
        render: (_, record) => (
          <Space size="middle">
            <Button style={{ color: "#ff0000" }}>
              <DeleteOutlined />
              ลบข้อมูล
            </Button>
          </Space>
        ),
      }
    ])
  }, [])
  useEffect(() => {
    console.log(data)
  }, [data])



  return (
    <ThemeProvider theme={theme}>
      <div className="otherSide" id="otherSide">
        <div>
          <Layouts />
        </div>
        <Box className="Box-title">
          <Typography className="text-font">ค้นหาข้อมูล</Typography>
        </Box>
        <Box
          className="content"
          component="form"
          onSubmit={handleSearchFormSubmit}
        >
          <Row
            gutter={[24, 24]}
            style={{ justifyContent: "center", alignItems: "center" }}
            autoComplete="off"
          >
            <Col>
              <TextField
                onChange={(event) => setParcelCodeSearch(event.target.value)}
                label="รหัสแปลงที่ดิน" />
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
                // type="submit"
                onClick={() => { navigate('../') }}
              >

                <AddIcon />
                เพิ่มแฟ้มเอกสาร
              </Button>
            </Col>
          </Row>
        </Box>
        <Box className="content">
          <Row style={{ justifyContent: "center" }}>
            <Table
              columns={columns}
              dataSource={data}
            />
          </Row>
        </Box>
      </div>
    </ThemeProvider>
  );
}

export default Search;
