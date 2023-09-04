import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Typography, Box, ThemeProvider, Button } from "@mui/material";
import { Row, Col, theme } from "antd";
import Layouts from "../Layout";
import Forminput from "../Forminput";
import "../../../src/index.css";
// import SweetAlert from 'sweetalert2-react';
import useCustomTheme from "../hooks/useCustomTheme";
import useInsertSubmit from "../hooks/useInsertSubmit";
import useUploadImages from "../hooks/useUploadImages";
import {SearchOutlined } from "@ant-design/icons"
function Home() {
  const navigate = useNavigate()
  const { theme } = useCustomTheme()
  const [parcelCode, setparcelCode] = useState(null)
  const [files, setFiles] = useState([
    {
      type: 0,
      image: {
        image: null,
        imageUrl: null,
      },
      note: null,
    }
  ]);
  const { fetchFilesInsert } = useInsertSubmit()
  const { fetchImageUpload } = useUploadImages();


  return (
    <ThemeProvider theme={theme}>
      <div className="otherSide" id="otherSide">
        <Layouts />
        <Box className="Box-title" >
          <Row >
            <Col className="text-font backgroud " span={10}>
              <Typography xs={2} style={{ fontWeight: '900', fontSize:'1.5rem',marginTop: '7px'}} >เพิ่มแฟ้มเอกสาร</Typography>
            </Col>
            <Col className="text-font" span={12} style={{display:'flex', justifyContent: 'flex-end'}} >
              <Button  
               style={{ fontWeight: '900',color:'#ffffff', fontSize: '1.2rem' }}
               onClick={() => { navigate('../search') }}
               >
                <SearchOutlined />
                ค้นหาข้อมูล
                </Button>
            </Col>
          </Row>
        </Box>
        <Box
          component='form'
          onSubmit={(event) => {
            fetchFilesInsert(event, files, parcelCode)
          }}
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

export default Home;
