import {
  Box,
  Stack,
  CardContent,
  Card,
  Typography,
  CardActions,
} from "@mui/material";
import Button from "../Button";
import UseFetchData from "../../hooks/useFetchData";
import IconButton from "../IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";


type Props = {};

type MealsCategories = {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
};

type List = {
  strCategory: string;
};

export default function HomeLayout({}: Props) {
  const apiUrl = "https://www.themealdb.com/api/json/v1/1/categories.php";

  const { data } = UseFetchData<MealsCategories[]>({
    apiUrl: apiUrl,
    queryKey: "MEALS_CATEGORIES",
    returnDataPath: (response) => response?.data?.categories,
  });

  const { data: list } = UseFetchData<List[]>({
    apiUrl: "https://www.themealdb.com/api/json/v1/1/list.php?c=list",
    queryKey: "LIST",
    returnDataPath: (response) => response?.data?.meals,
  });

  return (
    <>
      <Stack
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(4 , 1fr)",
          gap: 2,
          padding: "1rem 3%",
        }}
      >
        {data?.map((item) => (
          <Card
            key={item?.idCategory}
            sx={{ width: "100%", padding: "1rem", border: "2px solid red" }}
          >
            <CardContent sx={{ position: "relative" }}>
              <IconButton
                title={"Add to wishlist"}
                placement="top"
                sx={{
                  position: "absolute",
                  right: "10px",
                  top: "6px",
                  color: "red",
                }}
              >
                <FavoriteIcon fontSize="small" />
              </IconButton>
              <Box
                sx={{
                  width: "100%",
                }}
                src={item?.strCategoryThumb}
                component={"img"}
              />
              <Typography
                gutterBottom
                sx={{
                  color: "text.secondary",
                  fontSize: 16,
                  fontWeight: "bold",
                }}
              >
                {item?.strCategory}
              </Typography>
              <Typography
                gutterBottom
                sx={{ color: "text.secondary", fontSize: 14 }}
              >
                {item?.strCategoryDescription.slice(0, 30)}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                sx={{ bgcolor: "primary.main", width: "100%" }}
              >
                Add To Cart
              </Button>
            </CardActions>
          </Card>
        ))}
      </Stack>
      <Stack
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: 2,
          padding: "1rem 3%",
        }}
      >
        {list?.map((item) => (
          <Button
            size="small"
            sx={{ bgcolor: "primary.light", width: "100%" }}
            key={item?.strCategory}
          >
            {item?.strCategory}
          </Button>
        ))}
      </Stack>
    </>
  );
}
