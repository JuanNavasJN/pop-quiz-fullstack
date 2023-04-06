import { useContext, useState } from "react";
import Modal from "../shared/Modal";
import Typography from "@mui/material/Typography";
import { ModalsContext } from "../../contexts/ModalsContext";
import CustomTextField from "../forms/theme-elements/CustomTextField";
import { Box, Button, Rating, Stack } from "@mui/material";
import { Formik } from "formik";
import FormErrorMessage from "../shared/FormErrorMessage";

const WriteReviewModal = () => {
  const { isWriteReviewModalOpen, toggleWriteReviewModal } =
    useContext(ModalsContext);
  const [rating, setRating] = useState<number | null>(null);

  const initialValues = {
    comment: "",
  };

  return (
    <Modal open={isWriteReviewModalOpen} onClose={toggleWriteReviewModal}>
      <>
        <Typography id="modal-modal-title" variant="h5" component="h2">
          Leave your review
        </Typography>

        <Formik
          initialValues={initialValues}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              console.log(values, rating);
              // await login(values);
              // setSubmitting(false);
              // push("/");
            } catch (err: any) {
              // if (
              //   err.response &&
              //   (err.response.status === 404 || err.response.status === 403)
              // ) {
              //   notify({
              //     type: "error",
              //     message: "Invalid email or password.",
              //   });
              // } else {
              //   notify({
              //     type: "error",
              //     message: "Sorry, something went wrong.",
              //   });
              // }
            }
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit}>
              <Stack>
                <Box mt={2}>
                  <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    component="label"
                    htmlFor="rating"
                    mb="5px"
                  >
                    Rating
                  </Typography>
                  {/* rating field */}
                  <Box>
                    <Rating
                      name="rating"
                      onChange={(_, newValue) => setRating(newValue)}
                    />
                  </Box>
                </Box>
                <Box mt={1}>
                  <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    component="label"
                    htmlFor="comment"
                    mb="5px"
                  >
                    Comment
                  </Typography>
                  {/* comment field */}
                  <CustomTextField
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.comment}
                    name="comment"
                    variant="outlined"
                    fullWidth
                  />
                  {errors.comment && touched.comment && (
                    <FormErrorMessage text={errors.comment} />
                  )}
                </Box>

                <Box mt={2}>
                  <Button
                    color="primary"
                    variant="contained"
                    size="large"
                    fullWidth
                    type="submit"
                    disabled={isSubmitting || !rating}
                  >
                    Send Review
                  </Button>
                </Box>
              </Stack>
            </form>
          )}
        </Formik>
      </>
    </Modal>
  );
};

export default WriteReviewModal;
