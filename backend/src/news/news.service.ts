import { Injectable } from '@nestjs/common';
import * as NewsAPI from 'newsapi';

@Injectable()
export class NewsService {
  async getAllNews() {
    const newsapi = new NewsAPI(process.env.NEWS_API_KEY);

    const { articles } = await newsapi.v2.everything({
      q: 'malaysia',
      language: 'en',
      sortBy: 'publishedAt',
      pageSize: 20,
    });

    return articles.map(
      ({ author, title, description, url, urlToImage, publishedAt }) => ({
        author,
        title,
        description,
        url,
        urlToImage,
        publishedAt,
      }),
    );
  }
}
