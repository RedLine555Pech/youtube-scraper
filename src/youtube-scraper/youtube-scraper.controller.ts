import { Controller, Get, Query, UseFilters } from '@nestjs/common';
import { channel } from 'diagnostics_channel';
import { YoutubeScraperFilter } from './youtube-scraper.filter';
import { YoutubeScraperService } from './youtube-scraper.service';
import {
  YoutubeChannelInfo,
  YoutubePlaylistsPaged,
} from './youtube-scraper.types';

@UseFilters(new YoutubeScraperFilter())
@Controller('youtube')
export class YoutubeScraperController {
  constructor(private readonly youtubeService: YoutubeScraperService) {}

  @Get()
  getChannels(
    @Query('API_KEY') api_key,
    @Query('USERNAME') username,
  ): Promise<YoutubeChannelInfo> {
    return this.youtubeService.getChannels(api_key, username);
  }

  @Get('playlists')
  getPlaylists(
    @Query('API_KEY') api_key,
    @Query('CHANNEL_ID') channelId,
    @Query('PAGE_TOKEN') pageToken,
  ): Promise<YoutubePlaylistsPaged> {
    return this.youtubeService.getPlaylistsPaged(api_key, channelId, pageToken);
  }
}
