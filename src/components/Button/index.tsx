/**
 * @author Unni Krishnan
 *
 * Button component wraps Material-UI Button with additional loading functionality.
 * It displays a loading spinner when the `isloading` prop is true.
 *
 * @param {ButtonProps} props - The props for the Button component.
 * @param {React.Ref<HTMLButtonElement>} ref - Ref to forward to the underlying button element.
 * @returns {JSX.Element} The rendered button element.
 */

import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
  CircularProgress,
} from "@mui/material";
import { forwardRef } from "react";

type ButtonProps = MuiButtonProps & {
  isloading?: boolean;
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props: ButtonProps, ref) => {
    const { children, isloading, disabled } = props;
    return (
      <MuiButton disabled={disabled || isloading} ref={ref} {...props}>
        {isloading ? (
          <CircularProgress sx={{ color: "white" }} size={20} />
        ) : (
          children
        )}
      </MuiButton>
    );
  }
);
export default Button;
