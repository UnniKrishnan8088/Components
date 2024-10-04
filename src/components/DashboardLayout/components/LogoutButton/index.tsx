import { ListItem, ListItemButton } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

type LogoutButtonProps = {
  open: boolean;
};

export default function LogoutButton({ open }: LogoutButtonProps) {
  return (
    <ListItem disablePadding>
      <ListItemButton
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
        }}
      >
        <LogoutIcon />
        {open && "Logout"}
      </ListItemButton>
    </ListItem>
  );
}
