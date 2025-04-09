import { useState } from "react";
import { Snackbar, Alert } from "@mui/material";

export default function useToast() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("success");
  const [variant, setVariant] = useState("filled");

  const toast = ({ description, status = "success", variant = "filled" }) => {
    setMessage(description);
    setStatus(status);
    setVariant(variant);
    setOpen(true);
  };

  const ToastComponent = () => (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={() => setOpen(false)}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert
        onClose={() => setOpen(false)}
        severity={status}
        variant={variant}
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );

  return { toast, ToastComponent };
}