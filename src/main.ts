import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/module/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // await app.listen(3000);
  app.enableCors({
    origin: [
      'https://company-record.vercel.app',
      'https://company-record-abjerry97.vercel.app/',
      'https://company-record-git-main-abjerry97.vercel.app/',
      'https://company-record-msjmrses4-abjerry97.vercel.app/',
      'http://localhost:3001',
    ], //or whatever port your frontend is using
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    // optionSuccessStatus:200
  });
  await app.listen(3000);
}
bootstrap();
