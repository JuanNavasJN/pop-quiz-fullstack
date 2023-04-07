import { FC, useContext, useEffect, useState } from "react";
import Modal from "../shared/Modal";
import Typography from "@mui/material/Typography";
import { ModalsContext } from "../../contexts/ModalsContext";
import CustomTextField from "../forms/theme-elements/CustomTextField";
import { Box, Button, Rating, Stack } from "@mui/material";
import { Formik } from "formik";
import FormErrorMessage from "../shared/FormErrorMessage";
import { AuthContext } from "../../contexts/AuthContext";
import { NotifyContext } from "../../contexts/NotifyContext";
import { createReview } from "../../repositories/reviews";

interface WriteReviewModalProps {
  getEvents: () => void;
}

const WriteReviewModal: FC<WriteReviewModalProps> = ({ getEvents }) => {
  const { isWriteReviewModalOpen, toggleWriteReviewModal, eventId, myReview } =
    useContext(ModalsContext);
  const [rating, setRating] = useState<number | null>(null);
  const { token } = useContext(AuthContext);
  const { notify } = useContext(NotifyContext);

  const initialValues = {
    comment: "",
  };

  useEffect(() => {
    if (myReview) {
      setRating(myReview.rating);
    } else {
      setRating(null);
    }
  }, [myReview]);

  return (
    <Modal
      open={isWriteReviewModalOpen}
      onClose={() => toggleWriteReviewModal()}
    >
      <>
        <Typography id="modal-modal-title" variant="h5" component="h2">
          {myReview ? "Your Review" : "Leave your review"}
        </Typography>

        <Formik
          initialValues={initialValues}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              if (!token) throw new Error("No token");
              if (!rating) throw new Error("No rating");
              if (!eventId) throw new Error("No eventId");

              await createReview(token, {
                ...values,
                rating,
                eventId,
              });
              notify({
                type: "success",
                message: "Thank you for your review.",
              });
              getEvents();
              setSubmitting(false);
              toggleWriteReviewModal();
              setRating(null);
            } catch (err: any) {
              console.error(err);
              notify({
                type: "error",
                message: "Sorry, something went wrong.",
              });
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
                      value={rating}
                      onChange={(_, newValue) => setRating(newValue)}
                      readOnly={!!myReview}
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
                    value={myReview ? myReview.comment : values.comment}
                    disabled={!!myReview}
                    name="comment"
                    variant="outlined"
                    fullWidth
                  />
                  {errors.comment && touched.comment && (
                    <FormErrorMessage text={errors.comment} />
                  )}
                </Box>

                <Box mt={2}>
                  {!myReview && (
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
                  )}
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
