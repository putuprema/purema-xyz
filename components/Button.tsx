import React from "react";
import { Button as MuiButton, ButtonProps as MuiButtonProps, CircularProgress, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  outlined: {
    border: "1px solid",
  },
  root: {
    boxShadow: "none",
    padding: "0.3rem 2rem",
    borderRadius: "25px",
    textTransform: "revert",
    transition: "all 0.2s ease-in-out",
    "&:hover": {
      boxShadow: "none",
      transform: "scale(0.92)",
    },
    lineHeight: 1.1,
  },
  label: {
    padding: "0.5rem 0",
  },
  sizeSmall: {
    fontSize: "1rem",
    fontWeight: 700,
  },
  sizeLarge: {
    fontSize: "1.25rem",
    fontWeight: 700,
  },
});

export interface ButtonProps extends MuiButtonProps {
  /**
   * If `true`, loading spinner will be shown.
   */
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ loading, style, children, ...props }) => {
  const classes = useStyles();
  return (
    <MuiButton {...props} style={style} classes={classes}>
      {loading ? <CircularProgress size={props.size === "large" ? "1.5rem" : style?.fontSize || "1rem"} color="inherit" /> : children}
    </MuiButton>
  );
};

Button.defaultProps = {
  color: "primary",
  fullWidth: false,
  variant: "contained",
  loading: false,
  size: "large",
};
