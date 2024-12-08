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
  FormControl,
  FormHelperText,
} from "@mui/material";
import { Controller, Path, FieldValues } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

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
      let inputElement: React.ReactNode = null;

      switch (type) {
        case "text":
        case "textarea":
        case "email":
        case "number":
        case "phone":
          inputElement = (
            <TextField
              {...field}
              fullWidth
              variant="outlined"
              multiline={type === "textarea"}
              rows={type === "textarea" ? 4 : 1}
              size="small"
            />
          );
          break;
        case "dropdown":
          inputElement = (
            <TextField
              {...field}
              fullWidth
              variant="outlined"
              select
              size="small"
            >
              {options?.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          );
          break;
        case "multiselect":
          inputElement = (
            <Select
              {...field}
              fullWidth
              multiple
              variant="outlined"
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
          );
          break;
        case "date":
          inputElement = (
            <DatePicker value={field.value} onChange={field.onChange} />
          );
          break;
        case "checkbox":
          inputElement = (
            <FormControlLabel
              control={<Checkbox {...field} checked={!!field.value} />}
              label={label}
            />
          );
          break;
        case "radio":
          inputElement = (
            <>
              <RadioGroup
                {...field}
                row
                onChange={(e) => field.onChange(e.target.value)}
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
          break;
        default:
          inputElement = null;
      }

      return (
        <FormControl fullWidth error={Boolean(errorMessage)}>
          <FormLabel sx={{ flexDirection: "row" }}>
            {label}
            {rules?.required && (
              <FormHelperText
                sx={{ margin: 0, padding: 0 }}
                component={"span"}
                error
              >
                *
              </FormHelperText>
            )}
          </FormLabel>
          {inputElement}
          {errorMessage && (
            <FormHelperText id="my-helper-text" error>
              {errorMessage}
            </FormHelperText>
          )}
        </FormControl>
      );
    }}
  />
);

export default memo(InputField);
