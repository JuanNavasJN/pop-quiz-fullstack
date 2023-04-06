import {
  CardContent,
  Typography,
  Grid,
  Rating,
  Tooltip,
  Fab,
} from "@mui/material";
import { Stack } from "@mui/system";
import BlankCard from "../shared/BlankCard";
import { IconStar, IconPencil } from "@tabler/icons-react";
import { useRouter } from "next/router";
import { useContext } from "react";
import { ModalsContext } from "../../contexts/ModalsContext";
import WriteReviewModal from "./WriteReviewModal";

const events = [
  {
    id: "1",
    title: "1 Ut aliqua tempor do aliqua occaecat sunt",
    description:
      "Qui mollit nisi consectetur non tempor culpa esse aute exercitation dolor ipsum magna incididunt.",
    location: "003984 Petaling Jaya, Selangor",
    date: "5pm, 8th April 2023",
    rating: 4,
  },
  {
    id: "2",
    title: "2 Ut occaecat officia consectetur consequat sunt.",
    description:
      "Qui mollit nisi consectetur non tempor culpa esse aute exercitation dolor ipsum magna incididunt.",
    location: "003984 Petaling Jaya, Selangor",
    date: "5pm, 8th April 2023",
    rating: 5,
  },
  {
    id: "3",
    title: "3 Ut aliqua tempor do aliqunt.",
    description:
      "Qui mollit nisi consectetur non tempor culpa esse aute exercitation dolor ipsum magna incididunt.",
    location: "003984 Petaling Jaya, Selangor",
    date: "5pm, 8th April 2023",
    rating: 3.34,
  },
  {
    id: "4",
    title: "4 Ut aliqua tempor do aliquconsectetur consequat sunt.",
    description:
      "Qui mollit nisi consectetur non tempor culpa esse aute exercitation dolor ipsum magna incididunt.",
    location: "003984 Petaling Jaya, Selangor",
    date: "5pm, 8th April 2023",
    rating: 2,
  },
];

const EventsContainer = () => {
  const { push } = useRouter();
  const { toggleWriteReviewModal } = useContext(ModalsContext);

  return (
    <Grid container spacing={3}>
      <WriteReviewModal />
      {events.map((event, index) => (
        <Grid item xs={12} md={6} lg={4} key={index}>
          <BlankCard>
            <CardContent sx={{ p: 3, pt: 2 }}>
              <Typography variant="h6">{event.title}</Typography>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                mt={1}
              >
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
                        title="Write Review"
                        onClick={toggleWriteReviewModal}
                      >
                        <Fab size="small" color="info">
                          <IconPencil size="16" />
                        </Fab>
                      </Tooltip>
                      <Tooltip
                        title="View Reviews"
                        onClick={() =>
                          push({
                            pathname: `/events/${event.id}`,
                            query: event,
                          })
                        }
                      >
                        <Fab size="small" color="info">
                          <IconStar size="16" />
                        </Fab>
                      </Tooltip>
                    </Stack>
                  </Stack>
                  <Typography color="textSecondary" textAlign="justify" mt={1}>
                    {event.description}
                  </Typography>
                  <Typography color="textSecondary" mt={1}>
                    {event.date}
                  </Typography>
                  <Typography color="textSecondary" mt={1}>
                    {event.location}
                  </Typography>
                </Stack>
              </Stack>
            </CardContent>
          </BlankCard>
        </Grid>
      ))}
    </Grid>
  );
};

export default EventsContainer;
