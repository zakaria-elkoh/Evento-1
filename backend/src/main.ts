import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api');
  const PORT = process.env.PORT || 3000;
  await app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
  });
}
bootstrap();
