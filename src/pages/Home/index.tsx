import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DynamicForm from "../../components/DynamicForm";
import { formInputs } from "../../components/DynamicForm/formInputs";
import SearchableSelect from "../../components/SearchableSelect";
import React from "react";

type Props = {};

const options = [
  { label: "Option 1", value: 1 },
  { label: "Option 2", value: 2 },
  { label: "Option 3", value: 3 },
  { label: "Option 4", value: 4 },
  { label: "Option 5", value: 5 },
];

export default function Home({}: Props) {
  const navigate = useNavigate();
  const [selectedValue, setSelectedValue] = React.useState<any | null>(null); // State for the selected value

  const handleChange = (event: React.ChangeEvent<{}>, newValue: any | null) => {
    setSelectedValue(newValue); // Update the state with the selected value
  };
  return (
    <Box>
      {/* <Stack direction={"row"} gap={1}>
        <Button size="small" variant="contained">
          Home
        </Button>
        <Button size="small" variant="outlined">
          Home
        </Button>
        <Button size="small" variant="text">
          Home
        </Button>
        <Button size="small" variant="contained" isloading={true}>
          Home
        </Button>
        <Button
          size="small"
          variant="contained"
          startIcon={<HomeIcon fontSize="small" />}
        >
          Home
        </Button>
        <Button
          size="small"
          variant="contained"
          endIcon={<SendIcon fontSize="small" />}
        >
          Send
        </Button>
        <Button variant="text" onClick={() => navigate("products")}>
          Go to product page
        </Button>
      </Stack>
      <Stack direction={"row"} mt={5}>
        <IconButton title={"Alarm"} arrow>
          <AccessAlarmIcon />
        </IconButton>
      </Stack> */}
      <DynamicForm
        inputs={formInputs as any}
        onSubmit={(data) => console.log(data)}
      />

      <SearchableSelect
        onChange={handleChange}
        value={selectedValue}
        options={options}
      />
    </Box>
  );
}
