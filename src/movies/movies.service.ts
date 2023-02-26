import { CreateMovieDto } from './dto/create-movie.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll(): Movie[] {
    return this.movies;
  }

  getOne(movieId: string): Movie {
    const movie = this.movies.find((m) => m.id === +movieId);
    if (!movie) throw new NotFoundException(`movie not found! ${movieId}`);
    return movie;
  }

  deleteOne(movieId: string): boolean {
    this.getOne(movieId);
    this.movies = this.movies.filter((m) => m.id !== +movieId);
    return true;
  }

  create(data: CreateMovieDto) {
    this.movies.push({
      id: this.movies.length + 1,
      ...data,
    });
    return true;
  }

  search(title: string) {
    return this.movies.filter((m) => m.title.includes(title));
  }

  update(movieId: string, data: any): boolean {
    this.getOne(movieId);
    const idx = this.movies.findIndex((m) => m.id === +movieId);
    this.movies[idx].title = data.title;
    this.movies[idx].year = data.year;
    this.movies[idx].genres = data.genres;

    return true;
  }
}
