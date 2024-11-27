import { Module } from '@nestjs/common';
import { EventsModule } from './events/events.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const uri = configService.get<string>('MONGODB_URI');
        console.log('MongoDB URI:', uri); // For debugging

        return {
          uri,
          connectionFactory: (connection) => {
            connection.on('connected', () => {
              console.log('MongoDB connected successfully');
            });
            connection.on('error', (err) => {
              console.error('MongoDB connection error:', err);
            });
            return connection;
          },
        };
      },
      inject: [ConfigService],
    }),
    EventsModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
