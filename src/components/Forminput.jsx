import React from "react";
import "./Forminput.css";
import "../../src/index.css";
import Alert from '@mui/material/Alert';
import { Row, Col, Layout, Divider } from "antd";
import { TextField, Box, Typography, Button } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";

const { Content } = Layout;

export default function Forminput() {
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    // Process the uploaded file here
  };

  return (
    <Box className="content">
      <Typography>ข้อมูลแฟ้มเอกสาร</Typography>
      <Row gutter={[24, 24]}>
        <Col className="form-input">
          <TextField id="" className="text-field" label="รหัสแปลงที่ดิน" />
        </Col>
      </Row>
      <Divider orientation="left" className="divider">
        <Typography>อัพโหลดเอกสาร</Typography>
      </Divider>
      <Row gutter={[24, 24]}>
        <Col span={12} className="form-input">
          <TextField className="text-field" id="" label="เอกสาร" select>
            <MenuItem value={1}>เอกสารสิทธิ์</MenuItem>
            <MenuItem value={2}>ทด.1</MenuItem>
            <MenuItem value={3}>แบบสำรวจที่ดินและสิ่งปลูกสร้าง</MenuItem>
            <MenuItem value={4}>แบบสำรวจป้าย</MenuItem>
            <MenuItem value={5}>อื่นๆ</MenuItem>
          </TextField>
        </Col>
        <Col span={12}>
          <TextField className="text-field" type="file" />
        </Col>
      </Row>
      <Divider />
      <TextField id="" className="text-field" label="หมายเหตุ" />
      <Row gutter={[24, 24]} style={{ justifyContent: "flex-end" }}>
        <Col>
          <Button
            style={{
              height: "3rem",
              backgroundColor: "#3cb371",
              marginTop: "24px",
            }}
            variant="contained"
          >
            {/* <Alert variant="filled" severity="success"> บันทึกข้อมูลสำเร็จ</Alert> */}
            บันทึกข้อมูล
          </Button>
        </Col>
      </Row>
    </Box>
  );
}
