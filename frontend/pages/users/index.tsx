import type { ReactElement } from "react";
import { Grid, Box } from "@mui/material";
import PageContainer from "../../src/components/container/PageContainer";

// components
import FullLayout from "../../src/layouts/full/FullLayout";

export default function Users() {
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
