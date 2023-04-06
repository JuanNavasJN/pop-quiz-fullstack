import { useContext } from "react";
import { Box, Typography, Button, Stack } from "@mui/material";
import { Formik } from "formik";
import CustomTextField from "../../../src/components/forms/theme-elements/CustomTextField";
import { useRouter } from "next/router";
import { NotifyContext } from "../../../src/contexts/NotifyContext";
import { emailRegex } from "../../../src/helpers";
import { AuthContext } from "../../../src/contexts/AuthContext";
import FormErrorMessage from "../../../src/components/shared/FormErrorMessage";

interface loginType {
  title?: string;
  subtitle?: JSX.Element | JSX.Element[];
  subtext?: JSX.Element | JSX.Element[];
}

const AuthForgot = ({ title, subtitle, subtext }: loginType) => {
  const { forgotPassword } = useContext(AuthContext);
  const { push } = useRouter();
  const { notify } = useContext(NotifyContext);

  const initialValues = { email: "" };

  const validate = (values: typeof initialValues) => {
    const errors: any = {};
    if (!values.email) {
      errors.email = "Required";
    } else if (!emailRegex.test(values.email)) {
      errors.email = "Invalid email address";
    }

    return errors;
  };

  return (
    <>
      {title ? (
        <Typography fontWeight="700" variant="h2" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}

      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            await forgotPassword(values);
            setSubmitting(false);
            notify({ type: "success", message: "Please, check your email." });
            push("/authentication/login");
          } catch (err: any) {
            if (err.response && err.response.status === 404) {
              notify({
                type: "error",
                message: "Email not registered.",
              });
            } else {
              notify({
                type: "error",
                message: "Sorry, something went wrong.",
              });
            }
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
                  htmlFor="email"
                  mb="5px"
                >
                  Email
                </Typography>
                <CustomTextField
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  name="email"
                  variant="outlined"
                  fullWidth
                />
                {errors.email && touched.email && (
                  <FormErrorMessage text={errors.email} />
                )}
              </Box>
              <Box mt={3}>
                <Button
                  color="primary"
                  variant="contained"
                  size="large"
                  fullWidth
                  type="submit"
                  disabled={isSubmitting}
                >
                  Recover Password
                </Button>
              </Box>
            </Stack>
          </form>
        )}
      </Formik>
      {subtitle}
    </>
  );
};

export default AuthForgot;
