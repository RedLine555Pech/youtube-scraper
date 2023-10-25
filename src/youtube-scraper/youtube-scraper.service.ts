import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { YoutubeScraperException } from './youtube-scraper.exception';
import {
  YoutubeChannelInfo,
  YoutubePlaylistsPaged,
} from './youtube-scraper.types';
import { YOUTUBE_CHANNEL_PART } from './youtube-scraper.types';

@Injectable()
export class YoutubeScraperService {
  channelUrl = 'https://content-youtube.googleapis.com/youtube/v3/channels';
  playListsUrl = 'https://youtube.googleapis.com/youtube/v3/playlists';

  async getChannels(
    api_key: string,
    username: string,
    part = [
      YOUTUBE_CHANNEL_PART.SNIPPET,
      YOUTUBE_CHANNEL_PART.CONTENT_DETAILS,
      YOUTUBE_CHANNEL_PART.STATISTICS,
    ],
  ): Promise<YoutubeChannelInfo> {
    const partParam = part.join(',');
    try {
      const result = await axios.get(this.channelUrl, {
        params: { key: api_key, forUsername: username, part: partParam },
      });
      if (result.data.pageInfo.totalResults === 0) {
        throw new YoutubeScraperException('No channels found');
      } else {
        return new YoutubeChannelInfo(result.data.items[0]);
      }
    } catch (e) {
      if (e instanceof YoutubeScraperException) {
        throw e;
      }
      if (e.response && e.response.data?.error) {
        throw new YoutubeScraperException(e.response.data.error.message);
      } else {
        throw e;
      }
    }
  }

  async getPlaylistsPaged(
    api_key,
    channelId,
    pageToken = '',
    maxResults = 10,
    part = [YOUTUBE_CHANNEL_PART.SNIPPET, YOUTUBE_CHANNEL_PART.CONTENT_DETAILS],
  ): Promise<YoutubePlaylistsPaged> {
    const partParam = part.join(',');
    try {
      const result = await axios.get(this.playListsUrl, {
        params: {
          key: api_key,
          channelId,
          maxResults,
          pageToken,
          part: partParam,
        },
      });
      return new YoutubePlaylistsPaged(result.data);
    } catch (e) {
      if (e.response && e.response.data?.error) {
        throw new YoutubeScraperException(e.response.data.error.message);
      } else {
        throw e;
      }
    }
  }
}
