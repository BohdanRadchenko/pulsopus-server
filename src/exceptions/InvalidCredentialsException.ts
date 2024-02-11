import { HttpException, HttpExceptionOptions, HttpStatus } from '@nestjs/common';

export class InvalidCredentialsException extends HttpException {
	constructor(response: string = 'Invalid credentials', options?: HttpExceptionOptions) {
		super(response, HttpStatus.UNAUTHORIZED, options);
	}
}
