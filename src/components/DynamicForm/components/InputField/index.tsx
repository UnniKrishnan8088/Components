import React, { memo } from "react";
import {
  TextField,
  MenuItem,
  Select,
  Checkbox,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio,
} from "@mui/material";
import { Controller, Path, FieldValues } from "react-hook-form";

export type InputFieldProps<T extends FieldValues> = {
  control: any;
  name: Path<T>;
  label: string;
  type:
    | "text"
    | "textarea"
    | "dropdown"
    | "multiselect"
    | "date"
    | "checkbox"
    | "radio"
    | "email"
    | "number"
    | "phone";
  options?: { label: string; value: string | number }[];
  rules?: any;
};

const InputField = <T extends FieldValues>({
  control,
  name,
  label,
  type,
  options,
  rules,
}: InputFieldProps<T>) => (
  <Controller
    name={name}
    control={control}
    rules={rules}
    render={({ field, fieldState }) => {
      const errorMessage = fieldState.error?.message;

      switch (type) {
        case "text":
        case "textarea":
        case "email":
        case "number":
        case "phone":
          return (
            <TextField
              {...field}
              fullWidth
              label={label}
              variant="outlined"
              multiline={type === "textarea"}
              rows={type === "textarea" ? 4 : 1}
              error={!!errorMessage}
              helperText={errorMessage}
              size="small"
            />
          ) as React.ReactElement;
        case "dropdown":
          return (
            <TextField
              {...field}
              fullWidth
              label={label}
              variant="outlined"
              select
              error={!!errorMessage}
              helperText={errorMessage}
              size="small"
            >
              {options?.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          ) as React.ReactElement;
        case "multiselect":
          return (
            <Select
              {...field}
              fullWidth
              multiple
              variant="outlined"
              error={!!errorMessage}
              renderValue={(selected) =>
                Array.isArray(selected) && selected.length > 0
                  ? selected.join(", ")
                  : "Select options"
              }
              size="small"
            >
              {options?.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  <Checkbox
                    checked={
                      Array.isArray(field.value) &&
                      field.value.includes(option.value)
                    }
                  />
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          ) as React.ReactElement;
        // case "date":
        //   return (
        //     <DesktopDatePicker
        //       {...field}
        //       label={label}
        //       inputFormat="MM/dd/yyyy"
        //       renderInput={(params) => (
        //         <TextField
        //           {...params}
        //           fullWidth
        //           variant="outlined"
        //           error={!!errorMessage}
        //           helperText={errorMessage}
        //           size="small"
        //         />
        //       )}
        //     />
        //   );

        case "checkbox":
          return (
            <FormControlLabel
              control={
                <Checkbox
                  {...field}
                  checked={!!field.value} // Ensure the value is treated as boolean
                />
              }
              label={label}
            />
          );

        case "radio":
          return (
            <>
              <FormLabel>{label}</FormLabel>
              <RadioGroup
                {...field}
                row
                onChange={(e) => field.onChange(e.target.value)} // Map value to field.onChange
              >
                {options?.map((option) => (
                  <FormControlLabel
                    key={option.value}
                    value={option.value}
                    control={<Radio />}
                    label={option.label}
                  />
                ))}
              </RadioGroup>
            </>
          );
        default:
          return null as unknown as React.ReactElement;
      }
    }}
  />
);

export default memo(InputField);
