import { TextField } from "@mui/material";
import "./input/input";

interface Props {
  ssValue: string;
  ssName: string;
  onChange: (e: any) => void;
}

//Component for input field in search for repository
const LoginForm: React.FC<Props> = ({ ssValue, ssName, onChange }) => {
  return (
    <TextField
      className="outlined-basic"
      label={ssName == "ID" ? "Project ID" : "Access Token"}
      variant="outlined"
      name={ssName}
      sx={{ m: 3 }}
      inputProps={{ style: { background: "white", color: "#554488" } }}
      value={ssValue}
      disabled={false}
      onChange={onChange}
    />
  );
};

export default LoginForm;
