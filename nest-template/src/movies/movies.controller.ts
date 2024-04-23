import { UpdateMovieDto } from './dto/update-movie.dto';
import { CreateMovieDto } from './dto/create-movie.dto';
import { MoviesService } from './movies.service';
import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
  Body,
  Query,
} from '@nestjs/common';
import { Movie } from './entities/movie.entity';

// Controller 역할
// 1. Url 매핑 (express router)
// 2. Request (Query / Param / Body) / Response
// 여기서 핵심 역할 !! ⭐️
// Param | Body 등 원하는 데이터가 있으면 직접 호출 해야함! (express 처럼 req, res 전부 가져오지 않음!)
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesServeice: MoviesService) {}
  @Get()
  getAll(): Movie[] {
    return this.moviesServeice.getAll();
  }
  @Get('search')
  search(@Query('title') title: string): Movie[] {
    return this.moviesServeice.search(title);
  }
  @Get(':id')
  getOne(@Param('id') movieId: number): Movie {
    return this.moviesServeice.getOne(movieId);
  }

  @Post()
  createMovie(@Body() movieData: CreateMovieDto): boolean {
    return this.moviesServeice.create(movieData);
  }

  @Delete(':id')
  remove(@Param('id') movieId: number) {
    return this.moviesServeice.deleteOne(movieId);
  }

  // 간혹 PUT 을 사용 안하고 Patch로 사용하는 경우도 있음
  // why ?
  // PUT 은 모든 리소스를 업데이트 하기 때문임.
  @Patch(':id')
  update(@Param('id') movieId: number, @Body() updateMovie: UpdateMovieDto) {
    return this.moviesServeice.update(movieId, updateMovie);
  }
}
