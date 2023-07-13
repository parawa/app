import { createContext, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const CustomThemeContext = createContext({});

export const CustomThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(
    createTheme({
      typography: {
        fontFamily: ["IBM Plex Sans Thai", "sans-serif"].join(","),
      },
    })
  )

  return (
    <CustomThemeContext.Provider value={{ theme }}>
      {children}
    </CustomThemeContext.Provider>
  )
}

export default CustomThemeContext;
