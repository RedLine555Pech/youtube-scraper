import { Test, TestingModule } from '@nestjs/testing';
import { YoutubeScraperService } from './youtube-scraper.service';

describe('YoutubeScraperService', () => {
  let service: YoutubeScraperService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [YoutubeScraperService],
    }).compile();

    service = module.get<YoutubeScraperService>(YoutubeScraperService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
