import { Controller, Get } from '@nestjs/common';
import { NewsService } from './news.service';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('News')
@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  getAllNews() {
    return this.newsService.getAllNews();
  }
}
