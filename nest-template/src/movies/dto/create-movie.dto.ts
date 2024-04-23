import { IsNumber, IsOptional, IsString } from 'class-validator';

/**
 * @title DTO
 * @description Data Transfer Object 의 약자로 데이터를 오브젝트로 변환하는 객체
 * 즉 타입 정의를 위함
 */
export class CreateMovieDto {
  @IsString({ message: 'title의 타입은 String 입니다.' })
  readonly title: string;
  @IsNumber({}, { message: 'year의 타입은 number 입니다' })
  readonly year: number;
  @IsOptional()
  @IsString({ each: true })
  readonly genres: string[];
}
