import { Test, TestingModule } from '@nestjs/testing';
import { YoutubeScraperController } from './youtube-scraper.controller';

describe('YoutubeScraperController', () => {
  let controller: YoutubeScraperController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [YoutubeScraperController],
    }).compile();

    controller = module.get<YoutubeScraperController>(YoutubeScraperController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
