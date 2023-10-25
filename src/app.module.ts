import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { YoutubeScraperModule } from './youtube-scraper/youtube-scraper.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
      exclude: ['/api/(.*)'],
    }),
    YoutubeScraperModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
