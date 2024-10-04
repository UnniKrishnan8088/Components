import { forwardRef } from "react";
import {
  IconButton as MuiIconButton,
  IconButtonProps as MuiIconButtonProps,
  CircularProgress,
  TooltipProps,
  Tooltip,
} from "@mui/material";

type IconButtonProps = MuiIconButtonProps &
  TooltipProps & {
    isLoading?: boolean;
  };

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ isLoading, children, disabled, title, placement, ...props }, ref) => {
    return (
      <Tooltip title={title} placement={placement}>
        <MuiIconButton ref={ref} {...props} disabled={isLoading || disabled}>
          {isLoading ? <CircularProgress size={20} /> : children}
        </MuiIconButton>
      </Tooltip>
    );
  }
);

export default IconButton;
