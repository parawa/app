import React from "react";
import Layouts from "../Layout";
import "../../../src/index.css";
import Forminput from "../Forminput";
import useCustomTheme from "../hooks/useCustomTheme";
import { Typography, Box, ThemeProvider } from "@mui/material";

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
        <>
          <Forminput />
        </>
      </div>
    </ThemeProvider>
  );
}

export default Edit;
