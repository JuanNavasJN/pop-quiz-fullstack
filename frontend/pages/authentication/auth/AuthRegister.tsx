import { useContext } from "react";
import { AuthContext } from "../../../src/contexts/AuthContext";
import { Box, Typography, Button } from "@mui/material";
import { Formik } from "formik";
import FormErrorMessage from "../../../src/components/shared/FormErrorMessage";
import CustomTextField from "../../../src/components/forms/theme-elements/CustomTextField";
import { Stack } from "@mui/system";
import { useRouter } from "next/router";
import { NotifyContext } from "../../../src/contexts/NotifyContext";
import { emailRegex } from "../../../src/helpers";

interface registerType {
  title?: string;
  subtitle?: JSX.Element | JSX.Element[];
  subtext?: JSX.Element | JSX.Element[];
}

const AuthRegister = ({ title, subtitle, subtext }: registerType) => {
  const { register } = useContext(AuthContext);
  const { push } = useRouter();
  const { notify } = useContext(NotifyContext);

  const initialValues = { email: "", password: "", name: "" };

  const validate = (values: typeof initialValues) => {
    const errors: any = {};
    if (!values.email) {
      errors.email = "Required";
    } else if (!emailRegex.test(values.email)) {
      errors.email = "Invalid email address";
    }

    if (!values.name) errors.name = "Required";

    if (!values.password) {
      errors.password = "Required";
    } else if (values.password.length < 6) {
      errors.password = "Min. 6 characteres";
    } else if (values.password.length > 70) {
      errors.password = "Max. 70 characteres";
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

      <Box>
        <Formik
          initialValues={initialValues}
          validate={validate}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              await register(values);
              setSubmitting(false);
              notify({ type: "success", message: "Registered successfully." });
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
              <Stack mb={3}>
                <Typography
                  variant="subtitle1"
                  fontWeight={600}
                  component="label"
                  htmlFor="name"
                  mb="5px"
                >
                  Name
                </Typography>
                {/* name field */}
                <CustomTextField
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  name="name"
                  variant="outlined"
                  fullWidth
                />
                {errors.name && touched.name && (
                  <FormErrorMessage text={errors.name} />
                )}

                <Typography
                  variant="subtitle1"
                  fontWeight={600}
                  component="label"
                  htmlFor="email"
                  mb="5px"
                  mt="25px"
                >
                  Email Address
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

                <Typography
                  variant="subtitle1"
                  fontWeight={600}
                  component="label"
                  htmlFor="password"
                  mb="5px"
                  mt="25px"
                >
                  Password
                </Typography>
                {/* password field */}
                <CustomTextField
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  name="password"
                  variant="outlined"
                  fullWidth
                  type="password"
                />
                {errors.password && touched.password && (
                  <FormErrorMessage text={errors.password} />
                )}
              </Stack>
              <Button
                color="primary"
                variant="contained"
                size="large"
                fullWidth
                type="submit"
                disabled={isSubmitting}
              >
                Sign Up
              </Button>
            </form>
          )}
        </Formik>
      </Box>
      {subtitle}
    </>
  );
};

export default AuthRegister;
