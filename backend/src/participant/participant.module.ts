import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ParticipantService } from './participant.service';
import { ParticipantController } from './participant.controller';
import { EventsModule } from 'src/events/events.module';
import { Participant, ParticipantSchema } from './entities/participant.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Participant.name, schema: ParticipantSchema },
    ]),
    EventsModule,
  ],
  controllers: [ParticipantController],
  providers: [ParticipantService],
  exports: [ParticipantService],
})
export class ParticipantModule {}
