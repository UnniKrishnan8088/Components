import { Grid } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Product } from "..";
import Card from "../components/Card";
import SkeletonCard from "../components/SkeletonCard";

type Props = {};

export default function Products({}: Props) {
  const { data, isLoading } = useQuery({
    queryKey: ["PRODUCTS"],
    queryFn: async () => {
      try {
        const response: Product[] = (
          await axios.get("https://fakestoreapi.com/products/")
        ).data;
        return response;
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    },
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return (
      <Grid container spacing={2}>
        {Array.from({ length: 10 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </Grid>
    );
  }
  return (
    <Grid container spacing={2}>
      {data?.map((product) => <Card key={product?.id} {...product} />)}
    </Grid>
  );
}
