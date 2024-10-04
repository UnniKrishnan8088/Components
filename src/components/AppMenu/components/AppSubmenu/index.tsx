/**
 * @author Unni Krishnan
 *
 * AppSubmenu component represents a submenu that opens when
 * a parent menu item is clicked. It displays submenu items and
 * allows navigation to different paths.
 *
 * @param {AppSubmenuProps} props - The props for the component.
 * @returns {JSX.Element} The rendered submenu with navigation options.
 */

import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Menu,
} from "@mui/material";
import { MenuItem } from "../..";
import { useLocation, useNavigate } from "react-router-dom";

type AppSubmenuProps = {
  anchorEl: HTMLElement | null;
  open: boolean;
  handleClose: () => void;
  item: MenuItem;
};

export default function AppSubmenu({
  anchorEl,
  handleClose,
  item,
  open,
}: AppSubmenuProps) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Menu
      sx={{
        ml: 2,
      }}
      anchorEl={anchorEl}
      id="account-menu"
      open={open}
      onClose={handleClose}
      onClick={handleClose}
      transformOrigin={{ horizontal: "left", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      <List
        sx={{
          minWidth: "150px",
        }}
        disablePadding
      >
        {item?.submenu?.map((submenu) => (
          <ListItem sx={{ cursor: "pointer" }} disablePadding>
            <ListItemButton
              onClick={() => navigate(submenu?.path ?? "")}
              sx={{
                padding: "0 1rem",
                color:
                  location?.pathname === submenu?.path
                    ? "primary.main"
                    : "black",
              }}
            >
              <ListItemText>{submenu.title}</ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Menu>
  );
}
