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
    this.movies = this.movies.filter((m) => m.id !== +movieId);
    return true;
  }

  create(data: Movie) {
    this.movies.push({
      id: this.movies.length + 1,
      ...data,
    });
    return true;
  }

  search(title: string) {
    return this.movies.filter((m) => m.title.includes(title));
  }

  update(movieId: string, data: Movie): Movie {
    const idx = this.movies.findIndex((m) => m.id === +movieId);
    if (idx < 0) throw new Error('Movie Not Found');
    this.movies[idx] = data;
    return this.movies[idx];
  }
}
