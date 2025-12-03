/* istanbul ignore file */
import CFG from "./config";
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from "@nestjs/common";

function serverOk() {
  console.log(`Running backend at ${CFG.PORT}`);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: CFG.CORS_ORIGIN
  });

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(CFG.PORT, () => serverOk());
}
bootstrap();
