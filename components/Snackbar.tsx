import React from "react";
import { IconButton, Snackbar as MuiSnackbar, SnackbarProps } from "@material-ui/core";
import { Close } from "@material-ui/icons";

const Snackbar: React.FC<SnackbarProps> = (props) => (
  <MuiSnackbar
    {...props}
    action={
      <IconButton size="small" aria-label="close" color="inherit" onClick={(ev) => props.onClose && props.onClose(ev, "timeout")}>
        <Close fontSize="small" />
      </IconButton>
    }
  />
);

export default Snackbar;
