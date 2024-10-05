import { Grid, Paper, Skeleton } from "@mui/material";

type Props = {};

export default function SkeletonCard({}: Props) {
  return (
    <Grid item xs={3}>
      <Paper
        sx={{
          padding: "10px",
        }}
      >
        <Skeleton
          variant="rectangular"
          width="100%"
          height={150}
          sx={{ mb: 1 }}
        />
        <Skeleton width="60%" height={30} sx={{ mx: "auto", mb: 2 }} />
        <Skeleton variant="rectangular" width="100%" height={36} />
      </Paper>
    </Grid>
  );
}
