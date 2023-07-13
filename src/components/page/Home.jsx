import React from "react";
import { Typography, Box, ThemeProvider } from "@mui/material";
import { Row, Col, theme } from "antd";
import Layouts from "../Layout";
import Forminput from "../Forminput";
import "../../../src/index.css";
import useCustomTheme from "../hooks/useCustomTheme";
function Home() {
  const { theme } = useCustomTheme();
  return (
    <ThemeProvider theme={theme}>
      <div className="otherSide" id="otherSide">
        <Layouts />
        <Box className="Box-title">
          <Typography className="text-font">แฟ้มเอกสาร</Typography>
        </Box>
        <div>
          <Forminput />  
        </div>
      </div>
    </ThemeProvider>
  );
}

export default Home;
