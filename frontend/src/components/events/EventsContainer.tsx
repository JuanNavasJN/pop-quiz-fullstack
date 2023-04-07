import {
  CardContent,
  Typography,
  Grid,
  Rating,
  Tooltip,
  Fab,
  CircularProgress,
} from "@mui/material";
import { Stack } from "@mui/system";
import BlankCard from "../shared/BlankCard";
import { IconStar, IconPencil } from "@tabler/icons-react";
import { useRouter } from "next/router";
import { useCallback, useContext, useEffect, useState } from "react";
import { ModalsContext } from "../../contexts/ModalsContext";
import WriteReviewModal from "./WriteReviewModal";
import { AuthContext } from "../../contexts/AuthContext";
import { Event, getAllEvents } from "../../repositories/events";
import AddEventModal from "./AddEventModal";

const EventsContainer = () => {
  const { push } = useRouter();
  const { toggleWriteReviewModal } = useContext(ModalsContext);
  const { token, user } = useContext(AuthContext);
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getEvents = useCallback(() => {
    if (user && token) {
      setIsLoading(true);
      getAllEvents(token).then((evts) => {
        setEvents(evts);
        setIsLoading(false);
      });
    }
  }, [user, token]);

  useEffect(() => {
    getEvents();
  }, [getEvents]);

  return (
    <Grid container spacing={3}>
      <AddEventModal getEvents={getEvents} />
      <WriteReviewModal getEvents={getEvents} />
      {isLoading && (
        <Grid item xs={12}>
          <Stack justifyContent="center" alignItems="center">
            <CircularProgress />
          </Stack>
        </Grid>
      )}
      {events.map((event, index) => (
        <Grid item xs={12} md={6} lg={4} key={index}>
          <BlankCard>
            <CardContent sx={{ p: 3, pt: 2 }}>
              <Typography variant="h6">{event.title}</Typography>
              <Stack direction="column">
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Rating
                    name="read-only"
                    size="small"
                    value={event.rating}
                    readOnly
                  />
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Tooltip
                      title={
                        event.myReview ? "View Your Review" : "Write Review"
                      }
                      onClick={() =>
                        toggleWriteReviewModal(event._id!, event.myReview)
                      }
                    >
                      <Fab size="small" color="info">
                        <IconPencil size="16" />
                      </Fab>
                    </Tooltip>
                    {user && user.role === "admin" && (
                      <Tooltip
                        title="View Reviews"
                        onClick={() =>
                          push({
                            pathname: `/events/${event._id}`,
                            query: event as any,
                          })
                        }
                      >
                        <Fab size="small" color="info">
                          <IconStar size="16" />
                        </Fab>
                      </Tooltip>
                    )}
                  </Stack>
                </Stack>
                <Typography color="textSecondary" textAlign="justify" mt={1}>
                  {event.description}
                </Typography>
                <Typography color="textSecondary" mt={1}>
                  {new Date(event.datetime).toLocaleString()}
                </Typography>
                <Typography color="textSecondary" mt={1}>
                  {event.location}
                </Typography>
              </Stack>
            </CardContent>
          </BlankCard>
        </Grid>
      ))}
    </Grid>
  );
};

export default EventsContainer;
