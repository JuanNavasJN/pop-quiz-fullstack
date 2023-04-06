import { useContext } from "react";
import { Snackbar, Alert, Typography } from "@mui/material";
import { NotifyContext } from "../../contexts/NotifyContext";

export type NotityTypes = "error" | "warning" | "info" | "success";

const Notify = () => {
  const { isOpen, notifyOff, message, type } = useContext(NotifyContext);

  return (
    <Snackbar
      anchorOrigin={{
        horizontal: "right",
        vertical: "top",
      }}
      open={isOpen}
      autoHideDuration={6000}
      onClose={notifyOff}
    >
      <Alert onClose={notifyOff} severity={type} sx={{ width: "100%" }}>
        <Typography fontWeight={600}>{message}</Typography>
      </Alert>
    </Snackbar>
  );
};

export default Notify;
