import { useContext } from "react";
import { ThemeContext } from "./ThemeProvider";
import "./DarkmodeButton.css";
import { FormControlLabel, Switch } from "@mui/material";
import { useLocalStorage } from "../helpers/hooks";

//Component for toggle button for darkmode using Context API
const Button = () => {
  const { dark, toggleDark } = useContext(ThemeContext);
  const [localStorageDark] = useLocalStorage("darkmode", false);

  return (
    <div className={dark ? "darkmode" : "lightmode"}>
      <br />

      <FormControlLabel
        control={localStorageDark ? <Switch defaultChecked /> : <Switch />}
        label="Darkmode"
        onClick={(e) => toggleDark()}
      />
      <br />
    </div>
  );
};

export default Button;
