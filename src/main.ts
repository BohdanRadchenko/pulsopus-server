import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './modules/app/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { HttpExceptionFilter } from "./filters/http-exception.filter";
import { AppValidationPipe } from "./pipes/app-validation.pipe";
import { IConfig } from "./interfaces";

// TODO: create facade (filter?) controller -> service -> dto -> response
// TODO: refactor config.get all project

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const cfg: ConfigService<IConfig> = app.get(ConfigService);

  app.setGlobalPrefix(cfg.get('prefix'), {exclude: ['']});
  app.enableCors({
    origin: '*',
    methods: ['POST', 'PUT', 'PATCH', 'DELETE', 'GET']
  });

  const config = new DocumentBuilder()
    .setTitle('Pulsopus')
    .setDescription('pulsopus API description')
    .setVersion(cfg.get('version'))
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(cfg.get('prefix'), app, document);

  app.useGlobalPipes(new AppValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(cfg.get('port'));
}
bootstrap();
