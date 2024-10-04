/**
 * @author Unni Krishnan
 *
 * IconButton component wraps Material-UI IconButton with additional loading functionality.
 * It displays a loading spinner when the `isLoading` prop is true.
 *
 * @param {IconButtonProps} props - The props for the IconButton component.
 * @param {React.Ref<HTMLButtonElement>} ref - Ref to forward to the underlying button element.
 * @returns {JSX.Element} The rendered icon button element wrapped in a tooltip.
 */

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
