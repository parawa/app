import { useEffect, useState } from "react";
import { Typography, Box, ThemeProvider, Button } from "@mui/material";
import { Row, Col, theme } from "antd";
import Layouts from "../Layout";
import Forminput from "../Forminput";
import "../../../src/index.css";
import useCustomTheme from "../hooks/useCustomTheme";
import useInsertSubmit from "../hooks/useInsertSubmit";
import useUploadImages from "../hooks/useUploadImages";
function Home() {
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
  const {fetchImageUpload}   = useUploadImages();


  return (
    <ThemeProvider theme={theme}>
      <div className="otherSide" id="otherSide">
        <Layouts />
        <Box className="Box-title" >
          <Typography className="text-font" style={{ fontWeight:'900'}}>เพิ่มแฟ้มเอกสาร</Typography>
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
          <Row style={{ justifyContent: "flex-end" , marginRight:"24px"}}>
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
