import { useContext } from "react";
import { Box, Typography, Button, Stack } from "@mui/material";
import { Formik } from "formik";
import { useRouter } from "next/router";
import { NotifyContext } from "../../../src/contexts/NotifyContext";
import { AuthContext } from "../../../src/contexts/AuthContext";
import FormErrorMessage from "../../../src/components/shared/FormErrorMessage";
import CustomTextField from "../../../src/components/forms/theme-elements/CustomTextField";

interface loginType {
  title?: string;
  subtitle?: JSX.Element | JSX.Element[];
  subtext?: JSX.Element | JSX.Element[];
}

const AuthLogin = ({ title, subtitle, subtext }: loginType) => {
  const { resetPassword } = useContext(AuthContext);
  const { push, query } = useRouter();
  const { notify } = useContext(NotifyContext);

  const initialValues = { newPassword: "" };

  const validate = (values: typeof initialValues) => {
    const errors: any = {};
    if (!values.newPassword) {
      errors.newPassword = "Required";
    } else if (values.newPassword.length < 6) {
      errors.newPassword = "Min. 6 characteres";
    } else if (values.newPassword.length > 70) {
      errors.newPassword = "Max. 70 characteres";
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
            if (!query.token) {
              throw new Error("Not query token");
            }
            await resetPassword({
              ...values,
              resetToken: query.token,
            });
            setSubmitting(false);
            notify({
              type: "success",
              message: "Password reset successfully.",
            });
            push("/authentication/login");
          } catch (e) {
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
                  htmlFor="newPassword"
                  mb="5px"
                >
                  New Password
                </Typography>
                <CustomTextField
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.newPassword}
                  name="newPassword"
                  type="password"
                  variant="outlined"
                  fullWidth
                />
                {errors.newPassword && touched.newPassword && (
                  <FormErrorMessage text={errors.newPassword} />
                )}
              </Box>
            </Stack>
            <Box mt={3}>
              <Button
                color="primary"
                variant="contained"
                size="large"
                fullWidth
                type="submit"
                disabled={isSubmitting}
              >
                Reset Password
              </Button>
            </Box>
          </form>
        )}
      </Formik>
      {subtitle}
    </>
  );
};

export default AuthLogin;
