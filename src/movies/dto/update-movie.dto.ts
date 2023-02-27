import { PartialType } from '@nestjs/mapped-types';
import { CreateMovieDto } from './create-movie.dto';

// PartialType 👉 npm i @nestjs/mapped-types 👉 상속 받고 싶은 타입 정보 GET
/// UpdateMovieDto / CreateMovieDto와 인터페이스는 동일하나 필수 값이 아님
export class UpdateMovieDto extends PartialType(CreateMovieDto) {}
