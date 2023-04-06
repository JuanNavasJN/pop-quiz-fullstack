import { useEffect } from "react";
import { Grid, Box, Tooltip, Fab, Typography } from "@mui/material";
import DashboardCard from "../shared/DashboardCard";
import { IconTrash } from "@tabler/icons-react";
import { useRouter } from "next/router";
import ReviewsContainer from "./ReviewsContainer";

const Event = () => {
  const { query, back } = useRouter();

  useEffect(() => {
    if (!query) back();
  }, [query]);

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <DashboardCard
            title={
              query.title && typeof query.title === "string" ? query.title : ""
            }
            tooltipOption={
              <Tooltip title="Delete Event">
                <Fab size="small" color="error">
                  <IconTrash size="16" />
                </Fab>
              </Tooltip>
            }
          >
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12}>
                <Typography color="textSecondary" textAlign="justify" mt={1}>
                  {query.description}
                </Typography>
                <Typography color="textSecondary" mt={1}>
                  {query.date}
                </Typography>
                <Typography color="textSecondary" mt={1}>
                  {query.location}
                </Typography>
              </Grid>
            </Grid>
          </DashboardCard>
        </Grid>
        <ReviewsContainer />
      </Grid>
    </Box>
  );
};

export default Event;
