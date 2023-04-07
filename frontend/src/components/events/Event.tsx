import { useCallback, useContext, useEffect } from "react";
import { Grid, Box, Tooltip, Fab, Typography, Rating } from "@mui/material";
import DashboardCard from "../shared/DashboardCard";
import { IconTrash } from "@tabler/icons-react";
import { useRouter } from "next/router";
import ReviewsContainer from "./ReviewsContainer";
import { deleteEventById } from "../../repositories/events";
import { AuthContext } from "../../contexts/AuthContext";
import { NotifyContext } from "../../contexts/NotifyContext";

const Event = () => {
  const { query, back } = useRouter();
  const { token } = useContext(AuthContext);
  const { notify } = useContext(NotifyContext);

  useEffect(() => {
    if (!query) back();
  }, [query]);

  const handleDelete = useCallback(() => {
    if (token && query._id) {
      deleteEventById(token, query._id as string)
        .then((_) => {
          notify({ type: "success", message: "Event deleted" });
          back();
        })
        .catch((err) => {
          console.error(err);
          notify({
            type: "error",
            message: "Sorry, something went wrong.",
          });
        });
    }
  }, [token, query]);

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <DashboardCard
            title={
              query.title && typeof query.title === "string" ? query.title : ""
            }
            tooltipOption={
              <Tooltip title="Delete Event" onClick={handleDelete}>
                <Fab size="small" color="error">
                  <IconTrash size="16" />
                </Fab>
              </Tooltip>
            }
          >
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12}>
                {query.rating && (
                  <Rating
                    name="read-only"
                    size="small"
                    value={Number(query.rating)}
                    readOnly
                  />
                )}
                <Typography color="textSecondary" textAlign="justify" mt={1}>
                  {query.description}
                </Typography>
                <Typography color="textSecondary" mt={1}>
                  {query.datetime &&
                    new Date(query.datetime as string).toLocaleString()}
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
