import { Module } from '@nestjs/common';
import { EventsModule } from './events/events.module';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';
import { AuthModule } from './auth/auth.module';

// Load environment variables
dotenv.config();

const mongoUri = process.env.MONGODB_URI;
console.log('MongoDB URI:', mongoUri);

@Module({
  imports: [
    MongooseModule.forRoot(mongoUri, {
      connectionFactory: (connection) => {
        connection.on('connected', () => {
          console.log('MongoDB connected successfully');
        });
        connection.on('error', (err) => {
          console.error('MongoDB connection error:', err);
        });
        return connection;
      },
    }),
    EventsModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
