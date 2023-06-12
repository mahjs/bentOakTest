import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useState } from "react";
import { Controller, UseFormRegister } from "react-hook-form";
import { FormValues } from "../Form";

interface SelectProps {
  options: { id: number; name: string }[];
  label: string;
  placeHolder: string;
  onSelect: (city: string) => void;
  selectedOption: any;
  registery: UseFormRegister<FormValues>;
  name: "city" | "state";
  control: any;
  error: boolean;
}

const MyCustomSelect: React.FC<SelectProps> = ({
  options,
  label,
  placeHolder,
  onSelect,
  selectedOption,
  registery,
  name,
  control,
  error,
}: SelectProps) => {
  const [clicked, setClicked] = useState<boolean>(false);

  const handleChange = (event: SelectChangeEvent) => {
    onSelect(event.target.value);
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <FormControl>
          {clicked && <InputLabel>{clicked ? label : ""}</InputLabel>}
          <Select
            id={`${name}_id`}
            error={error}
            onFocus={() => setClicked(true)}
            defaultValue={placeHolder}
            value={selectedOption || placeHolder}
            label={clicked ? label : ""}
            onChange={(e) => {
              field.onChange(e);
              handleChange(e);
            }}
            sx={{
              width: "100%",
              borderRadius: "1rem",
              zIndex: 10,
              color: "gray",
            }}
          >
            <MenuItem value={placeHolder}>{placeHolder}</MenuItem>
            {options.map((op) => {
              return (
                <MenuItem key={op.id} value={op.name}>
                  {op.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      )}
    />
  );
};

export default MyCustomSelect;
