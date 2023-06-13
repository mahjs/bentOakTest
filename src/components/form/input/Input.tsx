import { TextField } from "@mui/material";
import { useState } from "react";
import { UseFormRegister } from "react-hook-form";
import { FormValues } from "../Form";

interface InputProps {
  type: "email" | "postCode";
  lable: string;
  placeHolder: string;
  error?: boolean;
  required?: boolean;
  registery: UseFormRegister<FormValues>;
}

const Input: React.FC<InputProps> = ({
  type,
  lable,
  placeHolder,
  error,
  required,
  registery,
}) => {
  const [clicked, setClicked] = useState<boolean>(false);

  return (
    <div>
      <TextField
        variant="outlined"
        required={required}
        error={error}
        {...registery(type)}
        onFocus={() => setClicked(true)}
        label={clicked || error ? lable : null}
        placeholder={placeHolder}
        fullWidth
        InputProps={{
          style: {
            borderRadius: "1rem",
          },
        }}
      />
    </div>
  );
};

export default Input;
