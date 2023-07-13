import { useContext } from "react";
import CustomThemeContext from "../context/CustomThemeContext";

const useCustomTheme = () => {
    return useContext(CustomThemeContext);
}

export default useCustomTheme;