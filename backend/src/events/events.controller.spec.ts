import { Test, TestingModule } from '@nestjs/testing';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';

describe('EventsController', () => {
  let controller: EventsController;
  let service: EventsService;

  const mockFile = {
    fieldname: 'eventImage',
    originalname: 'test.jpg',
    encoding: '7bit',
    mimetype: 'image/jpeg',
    buffer: Buffer.from('test'),
    size: 4,
  } as Express.Multer.File;

  const mockUser = {
    id: '1',
    email: 'test@example.com',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventsController],
      providers: [
        {
          provide: EventsService,
          useValue: {
            create: jest
              .fn()
              .mockResolvedValue({ id: '1', name: 'Test Event' }),
            findAll: jest.fn().mockResolvedValue({
              events: [],
              total: 0,
              page: 1,
              limit: 10,
            }),
            findOne: jest
              .fn()
              .mockResolvedValue({ id: '1', name: 'Test Event' }),
            update: jest
              .fn()
              .mockResolvedValue({ id: '1', name: 'Updated Event' }),
            remove: jest.fn().mockResolvedValue({ id: '1' }),
          },
        },
      ],
    }).compile();

    controller = module.get<EventsController>(EventsController);
    service = module.get<EventsService>(EventsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all events with pagination', async () => {
      const result = await controller.findAll('1', '10', mockUser);

      expect(service.findAll).toHaveBeenCalledWith(1, 10, mockUser);
      expect(result).toEqual({
        events: [],
        total: 0,
        page: 1,
        limit: 10,
      });
    });

    it('should use default pagination values', async () => {
      await controller.findAll(undefined, undefined, mockUser);

      expect(service.findAll).toHaveBeenCalledWith(1, 10, mockUser);
    });
  });

  describe('findOne', () => {
    it('should return a single event', async () => {
      const result = await controller.findOne('1');

      expect(service.findOne).toHaveBeenCalledWith('1');
      expect(result).toEqual({ id: '1', name: 'Test Event' });
    });
  });

  describe('update', () => {
    it('should update an event', async () => {
      const updateEventDto = { name: 'Updated Event' };

      // @ts-ignore
      const result = await controller.update('1', updateEventDto);

      expect(service.update).toHaveBeenCalledWith('1', updateEventDto);
      expect(result).toEqual({ id: '1', name: 'Updated Event' });
    });
  });

  describe('remove', () => {
    it('should remove an event', async () => {
      const result = await controller.remove('1');

      expect(service.remove).toHaveBeenCalledWith('1');
      expect(result).toEqual({ id: '1' });
    });
  });
});
