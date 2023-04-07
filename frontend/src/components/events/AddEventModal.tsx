import { FC, useContext, useEffect, useState } from "react";
import Modal from "../shared/Modal";
import Typography from "@mui/material/Typography";
import { ModalsContext } from "../../contexts/ModalsContext";
import CustomTextField from "../forms/theme-elements/CustomTextField";
import { Box, Button, Stack } from "@mui/material";
import { DateTimeField } from "@mui/x-date-pickers/DateTimeField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Formik } from "formik";
import { Dayjs } from "dayjs";
import FormErrorMessage from "../shared/FormErrorMessage";
import { createEvent } from "../../repositories/events";
import { AuthContext } from "../../contexts/AuthContext";
import { NotifyContext } from "../../contexts/NotifyContext";

interface AddEventModalProps {
  getEvents: () => void;
}

const AddEventModal: FC<AddEventModalProps> = ({ getEvents }) => {
  const { isAddEventModalOpen, toggleAddEventModal } =
    useContext(ModalsContext);
  const { token } = useContext(AuthContext);
  const { notify } = useContext(NotifyContext);

  const [datetime, setDatetime] = useState<Dayjs | undefined>();
  const [dateIsValid, setDateIsValid] = useState(false);

  const initialValues = {
    title: "",
    description: "",
    location: "",
  };

  const validate = (values: typeof initialValues) => {
    const errors: any = {};
    if (!values.title) {
      errors.title = "Required";
    }

    if (!values.description) {
      errors.description = "Required";
    }

    if (!values.location) {
      errors.location = "Required";
    }

    return errors;
  };

  useEffect(() => {
    if (datetime?.isValid()) setDateIsValid(true);
    else setDateIsValid(false);
  }, [datetime]);

  return (
    <Modal open={isAddEventModalOpen} onClose={toggleAddEventModal}>
      <>
        <Typography id="modal-modal-title" variant="h5" component="h2">
          New Event
        </Typography>

        <Formik
          initialValues={initialValues}
          validate={validate}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              if (!datetime) throw new Error("No datetime");

              if (!token) throw new Error("No token");

              await createEvent(token, {
                ...values,
                datetime: datetime.toISOString(),
              });
              getEvents();
              setSubmitting(false);
              toggleAddEventModal();
              setDatetime(undefined);
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
                    htmlFor="title"
                    mb="5px"
                  >
                    Title
                  </Typography>
                  {/* title field */}
                  <CustomTextField
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.title}
                    name="title"
                    variant="outlined"
                    fullWidth
                  />
                  {errors.title && touched.title && (
                    <FormErrorMessage text={errors.title} />
                  )}
                </Box>
                <Box mt={1}>
                  <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    component="label"
                    htmlFor="description"
                    mb="5px"
                  >
                    Description
                  </Typography>
                  {/* description field */}
                  <CustomTextField
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.description}
                    name="description"
                    variant="outlined"
                    fullWidth
                  />
                  {errors.description && touched.description && (
                    <FormErrorMessage text={errors.description} />
                  )}
                </Box>
                <Box mt={1}>
                  <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    component="label"
                    htmlFor="location"
                    mb="5px"
                  >
                    Location
                  </Typography>
                  {/* location field */}
                  <CustomTextField
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.location}
                    name="location"
                    variant="outlined"
                    fullWidth
                  />
                  {errors.location && touched.location && (
                    <FormErrorMessage text={errors.location} />
                  )}
                </Box>
                <Box mt={1}>
                  <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    component="label"
                    htmlFor="date"
                    mb="5px"
                  >
                    Date time
                  </Typography>
                  {/* datetime field */}
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Box>
                      <DateTimeField
                        sx={{
                          width: "100%",
                        }}
                        value={datetime}
                        onChange={(e: any) => setDatetime(e)}
                        onBlur={handleBlur}
                      />
                    </Box>
                  </LocalizationProvider>
                </Box>
                <Box mt={2}>
                  <Button
                    color="primary"
                    variant="contained"
                    size="large"
                    fullWidth
                    type="submit"
                    disabled={isSubmitting || !dateIsValid}
                  >
                    Add Event
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

export default AddEventModal;
