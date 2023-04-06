import { ReactElement, useContext, useEffect } from "react";
import { Grid, Box } from "@mui/material";
import PageContainer from "../../src/components/container/PageContainer";
import { AuthContext } from "../../src/contexts/AuthContext";
import { useRouter } from "next/router";

// components
import FullLayout from "../../src/layouts/full/FullLayout";

export default function MyProfile() {
  const { user, isLoading } = useContext(AuthContext);
  const { push } = useRouter();

  useEffect(() => {
    if (!isLoading && !user) push("/");
  }, [isLoading, user]);

  return (
    <PageContainer title="My Profile" description="this is MyProfile">
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12}></Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
}

MyProfile.getLayout = function getLayout(page: ReactElement) {
  return <FullLayout>{page}</FullLayout>;
};
