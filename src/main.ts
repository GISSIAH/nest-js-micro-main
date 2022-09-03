import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  /*
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: 'http://localhost:3000',
  });
  await app.listen(8001);
 */
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [
        'amqps://zeahigtb:E4zzJuo5opul94OzhUFyA3fjQKSfkQ3g@sparrow.rmq.cloudamqp.com/zeahigtb',
      ],
      queue: 'main_queue',
      queueOptions: {
        durable: false,
      },
    },
  });
  app.listen().then(()=>{
    console.log("microservice is up");
    
  })
}
bootstrap();
