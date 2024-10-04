/**
 * @author Unni Krishnan
 *
 * LogoutButton component represents a button for logging out of the application.
 * It displays a logout icon and the text "Logout" when the button is open.
 *
 * @param {LogoutButtonProps} props - The props for the component.
 * @returns {JSX.Element} The rendered logout button.
 */

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
