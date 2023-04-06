import { Typography } from "@mui/material";
import { FC } from "react";

interface FormErrorMessageProps {
  text: string;
}

const FormErrorMessage: FC<FormErrorMessageProps> = ({ text }) => {
  return (
    <Typography
      component="label"
      mt="5px"
      sx={{ color: (theme) => theme.palette.error.main }}
    >
      {text}
    </Typography>
  );
};

export default FormErrorMessage;
