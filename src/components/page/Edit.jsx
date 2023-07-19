import React from "react";
import Layouts from "../Layout";
import "../../../src/index.css";
import Forminput from "../Forminput";
import { Row } from "antd";
import useCustomTheme from "../hooks/useCustomTheme";
import { Typography, Box, ThemeProvider,Button } from "@mui/material";

function Edit() {
  const { theme } = useCustomTheme();
  return (
    <ThemeProvider theme={theme}>
      <div className="otherSide" id="otherSide">
        <div>
          <Layouts />
          <Box className="Box-title">
          <Typography className="text-font">แฟ้มเอกสาร</Typography>
        </Box>
        </div>
        <Box>
          <Forminput />
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

export default Edit;
