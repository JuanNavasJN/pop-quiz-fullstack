import { FC } from "react";
import Box from "@mui/material/Box";
import Modal, { ModalProps } from "@mui/material/Modal";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 1,
  p: 4,
};

const BasicModal: FC<ModalProps> = (props) => {
  return (
    <Modal
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      {...props}
    >
      <Box sx={style}>{props.children}</Box>
    </Modal>
  );
};

export default BasicModal;
