import { Grid, Rating, Stack, Typography } from "@mui/material";
import DashboardCard from "../shared/DashboardCard";

const reviews = [
  {
    id: "22",
    comment:
      "Exercitation eu ipsum excepteur voluptate eiusmod in amet minim dolor incididunt ad eu.",
    rating: 3,
    createdAt: "12-12-2023 23:23:23",
    createdBy: "John P",
  },
  {
    id: "223",
    comment:
      "Exercitation eu ipsum excepteur voluptate eiusmod in amet minim dolor incididunt ad eu.",
    rating: 3,
    createdAt: "12-12-2023 23:23:23",
    createdBy: "John P",
  },
  {
    id: "224",
    comment:
      "Exercitation eu ipsum excepteur voluptate eiusmod in amet minim dolor incididunt ad eu.",
    rating: 3,
    createdAt: "12-12-2023 23:23:23",
    createdBy: "John P",
  },
  {
    id: "225",
    comment:
      "Exercitation eu ipsum excepteur voluptate eiusmod in amet minim dolor incididunt ad eu.",
    rating: 3,
    createdAt: "12-12-2023 23:23:23",
    createdBy: "John P",
  },
];

const ReviewsContainer = () => {
  return (
    <Grid item xs={12}>
      <Stack paddingX={5} spacing={2}>
        {reviews.map((review) => (
          <DashboardCard key={review.id}>
            <Grid container>
              <Grid item xs={12} sm={12}>
                <Rating
                  name="read-only"
                  size="small"
                  value={review.rating}
                  readOnly
                />
                <Typography color="textSecondary" textAlign="justify" mt={1}>
                  {review.comment}
                </Typography>
                <Typography color="textSecondary" mt={1}>
                  {review.createdBy}
                </Typography>
                <Typography color="textSecondary" mt={1}>
                  {review.createdAt}
                </Typography>
              </Grid>
            </Grid>
          </DashboardCard>
        ))}
      </Stack>
    </Grid>
  );
};

export default ReviewsContainer;
