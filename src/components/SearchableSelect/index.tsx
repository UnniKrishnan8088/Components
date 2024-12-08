import { Autocomplete, TextField, MenuItem } from "@mui/material";
import React from "react";

interface Option {
  label: string;
  value: number;
}

type SearchableSelectProps = {
  options: Option[];
  value: Option | null; // Controlled value
  onChange: (event: React.ChangeEvent<{}>, newValue: Option | null) => void;
  placeholder?: string;
};

const SearchableSelect = ({
  options,
  onChange,
  value,
  placeholder,
}: SearchableSelectProps) => {
  React.useEffect(() => {
    console.log("selectedValue =>>>", value);
  }, [value]);

  return (
    <Autocomplete
      value={value} // Set the value of the Autocomplete component
      onChange={onChange} // Handle value change
      disablePortal
      options={options}
      getOptionLabel={(option) => option.label}
      size="small"
      renderInput={(params) => (
        <TextField {...params} placeholder={placeholder} />
      )}
      renderOption={(props, option) => (
        <MenuItem {...props} key={option.value}>
          {option.label}
        </MenuItem>
      )}
    />
  );
};

export default SearchableSelect;
