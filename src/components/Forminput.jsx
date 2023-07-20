import { useEffect, useState } from "react";
import "./Forminput.css";
import "../../src/index.css";
import Alert from "@mui/material/Alert";
import { Row, Col, Layout, Divider } from "antd";
import { TextField, Box, Typography, Button } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import AddIcon from "@mui/icons-material/Add";

export default function Forminput({files,setFiles,parcelCode,setParcelCode}) {

  return (
    <Box className="content">
      <Typography sx={{fontSize:"1.5em"}}>ข้อมูลแฟ้มเอกสาร</Typography>
      <Row gutter={[24, 24]}>
        <Col className="form-input">
          <TextField
            id=""
            className="text-field"
            label="รหัสแปลงที่ดิน"
            value={parcelCode}
              onChange={(event) => {
                setParcelCode(event.target.value)
            }}
          />
        </Col>
      </Row>
      {files?.map((data, index) => (
        <Box key={index}>
          <Divider orientation="left" className="divider">
            <Typography>อัพโหลดเอกสาร</Typography>
          </Divider>
          <Row gutter={[24, 24]}>
            <Col span={12} className="form-input">
              <TextField
                className="text-field"
                label="เอกสาร"
                select
                value={data.type}
                onChange={(e) => {
                  var arr = [...files]
                  arr[index].type = e.target.value
                  setFiles(arr)
                }}
              >
                <MenuItem value={0}>กรุณากรอก</MenuItem>
                <MenuItem value={1}>เอกสารสิทธิ์</MenuItem>
                <MenuItem value={2}>ทด.1</MenuItem>
                <MenuItem value={3}>แบบสำรวจที่ดินและสิ่งปลูกสร้าง</MenuItem>
                <MenuItem value={4}>แบบสำรวจป้าย</MenuItem>
                <MenuItem value={5}>อื่นๆ</MenuItem>
              </TextField>
            </Col>
            <Col span={12}>
              <TextField
                className="text-field"
                type="file"
                onChange={(e) => {
                  console.log(e.target.files)
                  var arr = [...files]
                  arr[index].image = {
                    image: e.target.files[0],
                    imageUrl: URL.createObjectURL(e.target.files[0])
                  }
                }}
              />
            </Col>

          </Row>
          <Divider />
          <TextField
            id=""
            className="text-field"
            label="หมายเหตุ"
            value={data.note}
            onChange={(e) => {
              var arr = [...files]
              arr[index].note = e.target.value
              setFiles(arr)
            }}
          />
          {index > 0 ?
            <Button
              style={{
                height: "3rem",
                backgroundColor: "#FF0000",
                marginTop: "24px",
                color: "#ffff",
                padding: "20px"
              }}
              variant="contained"
              onClick={() => {
                var arr = [...files]
                arr.splice(index, 1)
                setFiles(arr)
              }}
            >ลบ</Button>
            : ''
          }
        </Box>
      ))}
      <Row gutter={[24, 24]} style={{ justifyContent: "flex-end" }}>
        <Col>
          <Button
            style={{
              height: "3rem",
              backgroundColor: "#ffa500",
              marginTop: "24px",
              color: "#ffff"
            }}
            variant="contained"
            onClick={() => {
              setFiles([...files, {
                type: 0,
                image: {
                  image: null,
                  imageUrl: null,
                },
                note: null,
              }])
            }}
          >
            <AddIcon />
            เพิ่ม
          </Button>
        </Col>
        <Col>

        </Col>
        <Col>
         
        </Col>
      </Row>
    </Box>
  );
}
