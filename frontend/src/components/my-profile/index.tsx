import { Grid, Box, Typography } from "@mui/material";
import DashboardCard from "../shared/DashboardCard";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const MyProfile = () => {
  const { user } = useContext(AuthContext);

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <DashboardCard title="My Profile">
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12}>
                <Typography fontSize={16}>Name: {user?.name}</Typography>
                <Typography mt={1} fontSize={16}>
                  Email: {user?.email}
                </Typography>
                <Typography mt={1} fontSize={16}>
                  Role: {user?.role}
                </Typography>
              </Grid>
            </Grid>
          </DashboardCard>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MyProfile;
