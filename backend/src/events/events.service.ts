import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './entities/event.entity';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { AwsS3Service } from '../common/aws-s3.service';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel('Event') private readonly eventModel: Model<Event>,
    private readonly awsS3Service: AwsS3Service,
  ) {}

  async create(
    user,
    createEventDto: CreateEventDto,
    file?: Express.Multer.File,
  ): Promise<Event> {
    try {
      let imgUrl: string | undefined;

      if (file) {
        imgUrl = await this.awsS3Service.uploadFile(file);
      }

      const newEvent = new this.eventModel({
        ...createEventDto,
        organizer: user.userId,
        imgUrl,
      });
      console.log('user', user);

      return await newEvent.save();
    } catch (error) {
      throw new Error(`Failed to create event: ${error.message}`);
    }
  }

  async findAll(page: number = 1, limit: number = 10) {
    const pageNumber = Math.max(1, page);
    const limitNumber = Math.max(1, limit);

    const skip = (pageNumber - 1) * limitNumber;

    const events = await this.eventModel
      .find()
      .skip(skip)
      .limit(limitNumber)
      .exec();
    const total = await this.eventModel.countDocuments().exec();

    return {
      data: events,
      currentPage: pageNumber,
      perPage: limitNumber,
      totalPages: Math.ceil(total / limitNumber),
      totalEvents: total,
    };
  }

  async findOne(id: string): Promise<{ event: Event }> {
    // Validate ObjectId format
    if (!isValidObjectId(id)) {
      throw new HttpException(
        `Invalid ID format: ${id}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    // Find event by ID
    const event = await this.eventModel.findById(id).exec();

    // Handle not found case
    if (!event) {
      throw new HttpException(
        `Event with ID ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    return { event };
  }

  async update(id: string, updateEventDto: UpdateEventDto): Promise<Event> {
    const event = await this.eventModel.findById(id).exec();
    if (!event) {
      throw new HttpException(
        `Event with ID ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return this.eventModel
      .findByIdAndUpdate(id, updateEventDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<{ message: string }> {
    const event = await this.eventModel.findById(id).exec();
    if (!event) {
      throw new HttpException(
        `Event with ID ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    await this.eventModel.findByIdAndDelete(id).exec();
    if (1 > 1) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    return { message: 'Event deleted successfully' };
  }
}
