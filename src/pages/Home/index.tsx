import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DynamicForm from "../../components/DynamicForm";
import {
  FormValues,
  formInputs,
} from "../../components/DynamicForm/formInputs";

type Props = {};

export default function Home({}: Props) {
  const navigate = useNavigate();
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
      <DynamicForm<FormValues>
        inputs={formInputs}
        onSubmit={(data) => console.log(data)}
      />
    </Box>
  );
}
