import { RequestMethod, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.enableCors({ origin: '*' });

	app.setGlobalPrefix('v1', {
		exclude: [{ path: 'uploads', method: RequestMethod.GET }],
	});

	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
			whitelist: true,
			forbidNonWhitelisted: true,
		}),
	);

	await app.listen(3000);
}
bootstrap();
