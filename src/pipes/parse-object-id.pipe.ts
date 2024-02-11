import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ParseObjectIdPipe implements PipeTransform<any, Number> {
	transform(value: any, metadata: ArgumentMetadata): any {
		const isValidId = !Number.isNaN(Number(value));
		if (!isValidId) {
			throw new BadRequestException(`Invalid ID: ${value}`);
		}
		return value;
	}
}
