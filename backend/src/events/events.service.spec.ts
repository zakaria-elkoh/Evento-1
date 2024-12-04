import { Test, TestingModule } from '@nestjs/testing';
import { EventsService } from './events.service';
import { AwsS3Service } from '../common/aws-s3.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event } from './entities/event.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { HttpException, NotFoundException } from '@nestjs/common';

describe('EventsService', () => {
  let service: EventsService;
  let model: Model<Event>;
  let awsS3Service: AwsS3Service;

  const mockEvent = {
    _id: '674ed4bfab1cdf3fec01d650',
    title: 'Test Event',
    description: 'Test Description',
    location: 'Test Location',
    imgUrl: 'test-image.jpg',
    organizer: 'user123',
    totalPlaces: 100,
    totalReservation: 0,
  };

  const mockUser = {
    userId: 'user123',
    email: 'test@example.com',
  };

  const mockFile = {
    fieldname: 'eventImage',
    originalname: 'test.jpg',
    buffer: Buffer.from('test'),
    mimetype: 'image/jpeg',
  } as Express.Multer.File;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventsService,
        {
          provide: getModelToken('Event'),
          useValue: {
            new: jest.fn().mockResolvedValue(mockEvent),
            constructor: jest.fn().mockResolvedValue(mockEvent),
            find: jest.fn(),
            findById: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            findByIdAndDelete: jest.fn(),
            save: jest.fn(),
            exec: jest.fn(),
            countDocuments: jest.fn(),
          },
        },
        {
          provide: AwsS3Service,
          useValue: {
            uploadFile: jest.fn().mockResolvedValue('uploaded-url'),
          },
        },
      ],
    }).compile();

    service = module.get<EventsService>(EventsService);
    model = module.get<Model<Event>>(getModelToken('Event'));
    awsS3Service = module.get<AwsS3Service>(AwsS3Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create an event with image', async () => {});
  });

  describe('findAll', () => {
    it('should return paginated events', async () => {
      const mockEvents = [mockEvent];
      const mockCount = 1;

      jest.spyOn(model, 'find').mockReturnValue({
        sort: jest.fn().mockReturnValue({
          skip: jest.fn().mockReturnValue({
            limit: jest.fn().mockReturnValue({
              exec: jest.fn().mockResolvedValue(mockEvents),
            }),
          }),
        }),
      } as any);

      jest.spyOn(model, 'countDocuments').mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockCount),
      } as any);

      const result = await service.findAll(1, 10, mockUser);

      expect(result).toEqual({
        events: mockEvents,
        currentPage: 1,
        perPage: 10,
        totalPages: 1,
        totalEvents: mockCount,
      });
    });
  });

  describe('findOne', () => {
    it('should return a single event', async () => {
      jest.spyOn(model, 'findById').mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockEvent),
      } as any);

      const result = await service.findOne('674ed4bfab1cdf3fec01d650');

      expect(result).toEqual({ event: mockEvent });
    });

    it('should throw error if event not found', async () => {
      jest.spyOn(model, 'findById').mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      } as any);

      await expect(service.findOne('1')).rejects.toThrow(HttpException);
    });
  });

  describe('update', () => {
    it('should update an event', async () => {
      const updateEventDto: UpdateEventDto = {
        title: 'Updated Event',
      };

      jest.spyOn(model, 'findById').mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockEvent),
      } as any);

      jest.spyOn(model, 'findByIdAndUpdate').mockReturnValue({
        exec: jest.fn().mockResolvedValue({ ...mockEvent, ...updateEventDto }),
      } as any);

      const result = await service.update('1', updateEventDto);

      expect(result).toEqual({ ...mockEvent, ...updateEventDto });
    });
  });

  describe('remove', () => {
    it('should delete an event', async () => {
      jest.spyOn(model, 'findById').mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockEvent),
      } as any);

      jest.spyOn(model, 'findByIdAndDelete').mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockEvent),
      } as any);

      const result = await service.remove('1');

      expect(result).toEqual({ message: 'Event deleted successfully' });
    });
  });

  describe('updateReservationCount', () => {
    it('should update reservation count', async () => {
      jest.spyOn(model, 'findByIdAndUpdate').mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockEvent),
      } as any);

      await service.updateReservationCount('1', 1);

      expect(model.findByIdAndUpdate).toHaveBeenCalledWith(
        '1',
        { $inc: { totalReservation: 1 } },
        { new: true },
      );
    });

    it('should throw NotFoundException if event not found', async () => {
      jest.spyOn(model, 'findByIdAndUpdate').mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      } as any);

      await expect(service.updateReservationCount('1', 1)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
