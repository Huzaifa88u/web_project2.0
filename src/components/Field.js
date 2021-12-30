import { TextField } from "@mui/material";
import React from "react";
import "./Field.css";
import { styled } from "@mui/material/styles";

const CssTextField = styled(TextField)({
  "& label.MuiInputLabel-root ": {
    color: "black",
  },
  "& label.Mui-focused": {
    color: "#E35F21",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "green",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "grey",
    },
    "&:hover fieldset": {
      borderColor: "#E35F10",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#E35F21",
    },
  },
});

const Field = (props) => {
  return (
    <div className="p-2">
      <CssTextField
        fullWidth
        disabled={props.disabled}
        label={props.label}
        id={props.id}
        type={props.type}
        onChange={props.onChange}
        value={props.value}
      />
    </div>
  );
};
export default Field;
