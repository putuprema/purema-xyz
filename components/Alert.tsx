import React from "react";
import { Alert as MuiAlert, AlertProps } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    borderRadius: "25px",
    margin: "1rem 0",
    width: "100%",
  },
  icon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

const Alert: React.FC<AlertProps> = ({ children, ...props }) => {
  const classes = useStyles();
  return (
    <MuiAlert {...props} classes={classes}>
      {children}
    </MuiAlert>
  );
};

export default Alert;
