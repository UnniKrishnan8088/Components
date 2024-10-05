import { Box, Stack } from "@mui/material";
import Button from "../../components/Button";
import IconButton from "../../components/IconButton";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import HomeIcon from "@mui/icons-material/Home";
import SendIcon from "@mui/icons-material/Send";
import { useNavigate } from "react-router-dom";

type Props = {};

export default function Home({}: Props) {
  const navigate = useNavigate();
  return (
    <Box>
      <Stack direction={"row"} gap={1}>
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
      </Stack>
    </Box>
  );
}
