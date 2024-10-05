import { Stack } from "@mui/material";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";

export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
};
type Rating = {
  rate: number;
  count: number;
};

export default function Dashboard() {
  const navigate = useNavigate();
  return (
    <Stack
      sx={{
        width: "100%",
        height: "100dvh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button variant="text" onClick={() => navigate("products")}>
        Go to product page
      </Button>
    </Stack>
  );
}
