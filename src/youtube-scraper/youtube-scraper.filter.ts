import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { YoutubeScraperException } from './youtube-scraper.exception';

@Catch(YoutubeScraperException)
export class YoutubeScraperFilter implements ExceptionFilter {
  catch(exception: YoutubeScraperException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(HttpStatus.BAD_REQUEST).json({
      statusCode: HttpStatus.BAD_REQUEST,
      message: exception.message,
    });
  }
}
