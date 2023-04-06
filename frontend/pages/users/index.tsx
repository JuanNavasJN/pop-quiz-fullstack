import { ReactElement, useContext, useEffect } from "react";
import { Grid, Box } from "@mui/material";
import PageContainer from "../../src/components/container/PageContainer";
import { AuthContext } from "../../src/contexts/AuthContext";
import { useRouter } from "next/router";

// components
import FullLayout from "../../src/layouts/full/FullLayout";

export default function Users() {
  const { user } = useContext(AuthContext);
  const { push } = useRouter();

  useEffect(() => {
    if (!user) push("/");
  }, [user]);

  return (
    <PageContainer title="Users" description="this is Users">
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12}></Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
}

Users.getLayout = function getLayout(page: ReactElement) {
  return <FullLayout>{page}</FullLayout>;
};
