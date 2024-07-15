import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as mongoose from 'mongoose';
import { NotFoundException } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
  }));

  // Load environment variables
  const configService = app.get(ConfigService);

  // Database connection
  const DB = configService
    .get<string>('DATABASE')
    .replace('<PASSWORD>', configService.get<string>('DATABASE_PASSWORD'));

  mongoose
    .connect(DB, {})
    .then(() => console.log('DB connection successful!'))
    .catch((err) => {
      console.error('DB connection error:', err);
      process.exit(1);
    });

  // Start the app server
  const port = configService.get<number>('PORT') || 3000;
  const server = app.listen(port, () => {
    console.log(`App running on port ${port}...`);
  });

  // Handle uncaught exceptions
  process.on('uncaughtException', (err) => {
    console.error('UNCAUGHT EXCEPTION! SHUTTING DOWN...');
    console.error(err.name, err.message);
    process.exit(1);
  });

  app.use('*', (req, res) => {
    throw new NotFoundException(`Can't find ${req.originalUrl} on this server`);
  });

  // Handle unhandled rejections
  process.on('unhandledRejection', (err) => {
    console.error('UNHANDLED REJECTION! SHUTTING DOWN...');
    console.error(err);
    server.close(() => {
      process.exit(1);
    });
  });

  await app.listen(process.env.PORT || 3000);
}

bootstrap();
