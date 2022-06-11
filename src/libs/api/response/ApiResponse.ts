import { Either } from '../../../utils/either';
import { ErrorResponse } from './ErrorResponse';

export type ApiResponse<Body> = Either<ErrorResponse, Body>;
