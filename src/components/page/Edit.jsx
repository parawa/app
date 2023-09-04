import React, { useState } from "react";
import Layouts from "../Layout";
import "../../../src/index.css";
import Forminput from "../Forminput";
import { useNavigate } from 'react-router-dom';
import { Row, Col } from "antd";
import useCustomTheme from "../hooks/useCustomTheme";
import { Typography, Box, ThemeProvider, Button } from "@mui/material";
import { SearchOutlined } from "@ant-design/icons"

function Edit() {
  const navigate = useNavigate()
  // const {fetchdata,}
  const { theme } = useCustomTheme();
  const [parcelCode, setparcelCode] = useState(null)
  const [files, setFiles] = useState([
    {
      type: 0,
      image: {
        image: null,
        imageUrl: null
      },
      note: null
    }
  ])

  return (
    <ThemeProvider theme={theme}>
      <div className="otherSide" id="otherSide">
        <div>
          <Layouts />
          <Box className="Box-title" >
            <Row >
              <Col className="text-font backgroud " span={12}>
                <Typography style={{ fontWeight: '900', fontSize: '1.5rem',marginTop: '7px' }} >แฟ้มเอกสาร</Typography>
              </Col>
              <Col span={12}>
              <Row>
                <Col className="text-font" span={12} style={{ display: 'flex', justifyContent: 'flex-end' }} >
                  <Button
                    style={{ fontWeight: '900', color: '#ffffff', fontSize: '1.2rem' }}
                    onClick={() => { navigate('../search') }}
                  >
                    <SearchOutlined />
                    ค้นหาข้อมูล
                  </Button>
                </Col>
                <Col className="text-font" span={12} style={{ display: 'flex', justifyContent: 'flex-start' ,borderLeft:'3px solid #e8aa42ba'}} >
                  <Button
                    style={{ fontWeight: '900', color: '#ffffff', fontSize: '1.2rem' }}
                    onClick={() => { navigate('../') }}
                  >

                    เพิ่มแฟ้มเอกสาร
                  </Button>
                </Col>
              </Row>
              </Col>
            </Row>
          </Box>
        </div>
        <Box
          component='form'
        >
          <Forminput
            files={files}
            setFiles={setFiles}
            parcelCode={parcelCode}
            setParcelCode={setparcelCode}
          />
          <Row style={{ justifyContent: "flex-end", marginRight: "24px" }}>
            <Button
              style={{
                height: "3rem",
                backgroundColor: "#3cb371",
                marginTop: "24px",
              }}
              variant="contained"
              type="submit"
            >
              บันทึกข้อมูล
            </Button>
          </Row>
        </Box>
      </div>
    </ThemeProvider>
  );
}

export default Edit;
