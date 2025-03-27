import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    optionsSuccessStatus: 204,
    credentials: true,
  });
  await app.listen(process.env.PORT ?? 3000);

  console.log(`Server is running on port ${process.env.PORT ?? 3000}`);
  console.log(`Environment: ${process.env.ENVIRONMENT}`);
}
bootstrap().catch((err) => console.error(err));
