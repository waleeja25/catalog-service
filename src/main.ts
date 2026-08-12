import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

import { grpcConfig } from './config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const port = configService.get<number>('app.port');

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: grpcConfig,
  });

  await app.startAllMicroservices();

  await app.listen(port ?? 3002);

  console.log(`Catalog Service HTTP running on port ${port ?? 3002}`);
  console.log('Catalog Service gRPC running');
}

bootstrap().catch((error) => {
  console.error(error);
  process.exit(1);
});
