import { Test, TestingModule } from '@nestjs/testing';
import { EventsService } from './events.service';
import { AwsS3Service } from '../common/aws-s3.service';
import { getModelToken } from '@nestjs/mongoose';

describe('EventsService', () => {
  let service: EventsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventsService,
        {
          provide: AwsS3Service,
          useValue: {}, // Mock AwsS3Service with an empty object
        },
        {
          provide: getModelToken('Event'),
          useValue: {}, // Mock Mongoose Model with an empty object
        },
      ],
    }).compile();

    service = module.get<EventsService>(EventsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
