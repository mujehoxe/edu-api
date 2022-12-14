import { Controller, Get, StreamableFile, Res, Param } from '@nestjs/common';
import { createReadStream } from 'fs';
import { join } from 'path';
import type { Response } from 'express';

@Controller('uploads')
export class LocalFilesController {
	@Get(':filetype/:filename')
	getFile(
		@Param('filetype') type: string,
		@Param('filename') filename: string,
		@Res({ passthrough: true }) res: Response,
	): StreamableFile {
		const file = createReadStream(
			join(process.cwd(), 'uploads', type, filename),
		);

		res.set({
			'Content-Type': 'application/json',
			// 'Content-Disposition': 'attachment; filename="package.json"',
		});

		return new StreamableFile(file);
	}
}
