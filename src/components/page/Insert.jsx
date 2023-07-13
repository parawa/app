import React from "react";
import Layouts from "../Layout";
import "./insert.css";
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
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';

function Insert() {
  const { theme } = useCustomTheme();
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
              <TextField label="เอกสารสิทธิ์" />
            </Col>
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
                <SearchIcon/>
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
                <AddIcon/>
                เพิ่มแฟ้มเอกสาร
              </Button>
            </Col>
          </Row>
        </Box>
        <Box className="content">
          <Row></Row>
        </Box>
      </div>
    </ThemeProvider>
  );
}

export default Insert;
