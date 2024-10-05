import { Box, Grid, Paper, Typography } from "@mui/material";
import { Product } from "..";
import Button from "../../../components/Button";
import { useNavigate } from "react-router-dom";

type Props = Product;

export default function Card({ id, image, title }: Props) {
  const navigate = useNavigate();
  return (
    <Grid item xs={3}>
      <Paper
        sx={{
          padding: "10px",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "150px",
            objectFit: "contain",
          }}
          component={"img"}
          src={image}
        />
        <Typography
          sx={{
            textAlign: "center",
          }}
        >
          {title?.slice(0, 25)}
        </Typography>
        <Button
          size="small"
          sx={{ width: "100%" }}
          onClick={() => navigate(`${id}`)}
          variant="outlined"
        >
          Show Details
        </Button>
      </Paper>
    </Grid>
  );
}
