import { StringifyOptions } from 'querystring';

export enum YOUTUBE_CHANNEL_PART {
  SNIPPET = 'snippet',
  CONTENT_DETAILS = 'contentDetails',
  STATISTICS = 'statistics',
}

export type YoutubeChannelStatistic = {
  viewCount: number;
  subscriberCount: number;
  videoCount: number;
};

export class YoutubeChannelInfo {
  id: string;
  name: string;
  thumbnail: string;
  statistics: YoutubeChannelStatistic;
  constructor(rawData: any) {
    this.id = rawData.id;
    this.name = rawData.snippet.title;
    this.thumbnail =
      rawData.snippet.thumbnails.default?.url ||
      rawData.snippet.thumbnails.medium?.url;
    this.statistics = {
      viewCount: Number(rawData.statistics.viewCount),
      subscriberCount: Number(rawData.statistics.subscriberCount),
      videoCount: Number(rawData.statistics.videoCount),
    };
  }
}

export class YoutubePlaylistInfo {
  name: string;
  thumbnail: string;
  constructor(rawData: any) {
    this.name = rawData.snippet.title;
    this.thumbnail =
      rawData.snippet.thumbnails.default?.url ||
      rawData.snippet.thumbnails.medium?.url;
  }
}

export class YoutubePlaylistsPaged {
  items: YoutubePlaylistInfo[];
  nextPageToken: string;
  constructor(rawData) {
    this.nextPageToken = rawData.nextPageToken;
    this.items = rawData.items.map((item) => new YoutubePlaylistInfo(item));
  }
}
