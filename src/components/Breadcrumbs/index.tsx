import { Stack } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

type BreadcrumbsProps = {};

export default function Breadcrumbs({}: BreadcrumbsProps) {
  const { pathname } = useLocation();
  const pathNames = pathname?.split("/")?.filter((x) => x);

  let breadcrumbPath = "";

  // Don't render breadcrumbs if on the root page
  if (pathNames.length === 1) {
    return null;
  }

  return (
    <Stack direction={"row"} mb={2}>
      {pathNames?.map((path, index) => {
        breadcrumbPath += `/${path}`;
        const isLast = index === pathNames?.length - 1;
        return isLast ? (
          <span key={breadcrumbPath}>/{path}</span>
        ) : (
          <span key={breadcrumbPath}>
            /<Link to={breadcrumbPath}>{path}</Link>
          </span>
        );
      })}
    </Stack>
  );
}
