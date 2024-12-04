import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';
import { EventsService } from '../events/events.service';
import {
  Participant,
  ParticipantDocument,
} from './entities/participant.entity';

@Injectable()
export class ParticipantService {
  constructor(
    @InjectModel(Participant.name)
    private participantModel: Model<ParticipantDocument>,
    private eventsService: EventsService,
  ) {}

  async create(
    createParticipantDto: CreateParticipantDto,
  ): Promise<Participant> {
    try {
      const event = await this.eventsService.findOne(
        createParticipantDto.event,
      );
      if (!event) {
        throw new NotFoundException('Event not found');
      }
      console.log('event', event.event.title);

      const createdParticipant = new this.participantModel(
        createParticipantDto,
      );
      await this.eventsService.updateReservationCount(event?.event?._id, 1);

      return createdParticipant.save();
    } catch (error) {
      throw error;
    }
  }

  async findAll(event: string): Promise<Participant[]> {
    // const query = eventId ? { event: eventId } : {};
    const participants = await this.participantModel
      .find({ event: event })
      .populate('event', 'title date location')
      .sort({ createdAt: -1 })
      .exec();
    console.log('participants', participants);

    return participants;
  }

  async findOne(id: string): Promise<Participant> {
    const participant = await this.participantModel
      .findById(id)
      .populate('event', 'title date location')
      .exec();

    if (!participant) {
      throw new NotFoundException('Participant not found');
    }
    return participant;
  }

  async update(
    id: string,
    updateParticipantDto: UpdateParticipantDto,
  ): Promise<Participant> {
    const existingParticipant = await this.participantModel
      .findByIdAndUpdate(id, updateParticipantDto, { new: true })
      .populate('event', 'title date location')
      .exec();

    if (!existingParticipant) {
      throw new NotFoundException('Participant not found');
    }

    return existingParticipant;
  }

  async remove(id: string): Promise<Participant> {
    const deletedParticipant = await this.participantModel
      .findByIdAndDelete(id)
      .exec();

    console.log('deletedParticipant aaaaaaaaaa', deletedParticipant);

    if (!deletedParticipant) {
      throw new NotFoundException('Participant not found');
    }
    await this.eventsService.updateReservationCount(
      deletedParticipant.event,
      -1,
    );

    return deletedParticipant;
  }

  async findByEvent(eventId: string): Promise<Participant[]> {
    return this.participantModel
      .find({ event: eventId })
      .populate('event', 'title date location')
      .exec();
  }
}
