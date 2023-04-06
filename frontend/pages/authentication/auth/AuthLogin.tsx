import { useContext } from "react";
import { Box, Typography, Button, Stack } from "@mui/material";
import Link from "next/link";
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

const AuthLogin = ({ title, subtitle, subtext }: loginType) => {
  const { login } = useContext(AuthContext);
  const { push } = useRouter();
  const { notify } = useContext(NotifyContext);

  const initialValues = { email: "", password: "" };

  const validate = (values: typeof initialValues) => {
    const errors: any = {};
    if (!values.email) {
      errors.email = "Required";
    } else if (!emailRegex.test(values.email)) {
      errors.email = "Invalid email address";
    }

    if (!values.password) {
      errors.password = "Required";
    } else if (values.password.length < 6 || values.password.length > 70) {
      errors.password = "Invalid";
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
            await login(values);
            setSubmitting(false);
            push("/");
          } catch (err: any) {
            if (
              err.response &&
              (err.response.status === 404 || err.response.status === 403)
            ) {
              notify({
                type: "error",
                message: "Invalid email or password.",
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
              <Box>
                <Typography
                  variant="subtitle1"
                  fontWeight={600}
                  component="label"
                  htmlFor="email"
                  mb="5px"
                >
                  Email
                </Typography>
                {/* email field */}
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
              <Box mt="25px">
                <Typography
                  variant="subtitle1"
                  fontWeight={600}
                  component="label"
                  htmlFor="password"
                  mb="5px"
                >
                  Password
                </Typography>
                {/* password field */}
                <CustomTextField
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  name="password"
                  type="password"
                  variant="outlined"
                  fullWidth
                />
                {errors.password && touched.password && (
                  <FormErrorMessage text={errors.password} />
                )}
              </Box>
              <Stack
                justifyContent="flex-end"
                direction="row"
                alignItems="center"
                my={2}
              >
                <Typography
                  component={Link}
                  href="/authentication/forgot"
                  fontWeight="500"
                  sx={{
                    textDecoration: "none",
                    color: "primary.main",
                  }}
                >
                  Forgot Password ?
                </Typography>
              </Stack>
            </Stack>
            <Box>
              <Button
                color="primary"
                variant="contained"
                size="large"
                fullWidth
                type="submit"
                disabled={isSubmitting}
              >
                Sign In
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
