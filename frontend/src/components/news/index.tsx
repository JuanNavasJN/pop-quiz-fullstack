import {
  Grid,
  Box,
  Tooltip,
  Fab,
  CardContent,
  Typography,
  Stack,
  CircularProgress,
} from "@mui/material";
import DashboardCard from "../shared/DashboardCard";
import { IconExternalLink } from "@tabler/icons-react";
import BlankCard from "../shared/BlankCard";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Article, getAllNews } from "../../repositories/news";

const News = () => {
  const [news, setNews] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getAllNews().then((news) => {
      setNews(news);
      setIsLoading(false);
    });
  }, []);

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <DashboardCard title="News">
            <Grid container spacing={3}>
              {isLoading && (
                <Grid item xs={12}>
                  <Stack justifyContent="center" alignItems="center">
                    <CircularProgress />
                  </Stack>
                </Grid>
              )}
              {news.map((article, idx) => (
                <Grid item xs={12} sm={12} key={idx}>
                  <BlankCard>
                    <CardContent sx={{ p: 3, pt: 2 }}>
                      <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Typography variant="h6">{article.title}</Typography>
                        <Link href={article.url} target="_blank">
                          <Tooltip title={"Read more"}>
                            <Fab size="small" color="info">
                              <IconExternalLink size="16" />
                            </Fab>
                          </Tooltip>
                        </Link>
                      </Stack>
                      <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        mt={1}
                      >
                        <Stack direction="column">
                          <Typography
                            color="textSecondary"
                            textAlign="justify"
                            mt={1}
                          >
                            {article.author}
                          </Typography>
                          <Typography
                            color="textSecondary"
                            textAlign="justify"
                            mt={1}
                          >
                            {article.description}
                          </Typography>
                          <Typography
                            color="textSecondary"
                            textAlign="justify"
                            mt={1}
                          >
                            {new Date(article.publishedAt).toLocaleString()}
                          </Typography>
                        </Stack>
                      </Stack>
                    </CardContent>
                  </BlankCard>
                </Grid>
              ))}
            </Grid>
          </DashboardCard>
        </Grid>
      </Grid>
    </Box>
  );
};

export default News;
