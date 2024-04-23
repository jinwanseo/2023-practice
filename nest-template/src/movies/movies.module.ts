import { MoviesController } from './movies.controller';
import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';

@Module({
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule {}
