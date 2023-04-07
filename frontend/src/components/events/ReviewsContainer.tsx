import {
  CircularProgress,
  Grid,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import DashboardCard from "../shared/DashboardCard";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Review, getReviewsByEventId } from "../../repositories/reviews";

const ReviewsContainer = () => {
  const { query } = useRouter();
  const { token, user } = useContext(AuthContext);
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    if (user && token && query && query._id) {
      getReviewsByEventId(token, query._id as string).then((revws) => {
        setReviews(revws);
      });
    }
  }, [token, user, query]);

  return (
    <Grid item xs={12}>
      {reviews.length === 0 && (
        <Grid item xs={12}>
          <Stack justifyContent="center" alignItems="center">
            <CircularProgress />
          </Stack>
        </Grid>
      )}
      <Stack paddingX={5} spacing={2}>
        {reviews.map((review) => (
          <DashboardCard key={review._id}>
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
                  {review.createdBy?.name}
                </Typography>
                <Typography color="textSecondary" mt={1}>
                  {review.createdAt &&
                    new Date(review.createdAt).toLocaleString()}
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
