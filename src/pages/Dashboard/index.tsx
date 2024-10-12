import { Stack, Typography } from "@mui/material";
import { motion } from "framer-motion";
import Button from "../../components/Button";

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
  return (
    <Stack
      sx={{
        width: "100%",
        height: "100dvh",
        gap: "1rem",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        // transition={{ type: "spring" }}
        transition={{
          duration: 0.6,
          ease: [0.25, 0.8, 0.25, 1], // Custom cubic-bezier for smooth ease
        }}
      >
        <Stack
          sx={{
            width: "100%",
            padding: "1rem",
            background: "#00FF9C",
            borderRadius: "10px",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Dashboard
          </Typography>
          <Button variant="contained">Add Widget</Button>
        </Stack>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{
          duration: 0.6,
          ease: "easeInOut", // Alternate ease effect for second section
        }}
        style={{ width: "100%", height: "70dvh" }} // Consistent sizing
      >
        <Stack
          sx={{
            width: "100%",
            height: "100%",
            padding: "2rem",
            backgroundColor: "#FEFFA7",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Matching shadow
          }}
        >
          <h1>slkjhsdlkfjashd</h1>
        </Stack>
      </motion.div>
    </Stack>
  );
}
