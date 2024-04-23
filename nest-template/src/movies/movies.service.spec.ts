import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

/**
 * 테스트
 * describe : 서비스 전체 그룹
 * beforeEach : 테스트 전 실행
 * it : it should be ...와 같이 단위 테스트에 사용 하는 키워드
 * expect().toBe...
 *
 * ⭐️ NestJs에서 .spec이 붙은 파일은 모두 unit test를 위한 파일
 */
describe('MoviesService', () => {
  let service: MoviesService;

  // 테스트 전 실행 되는 소스
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  describe('getAll', () => {
    it('should return an array', () => {
      const result = service.getAll();
      // 배열 인지 체크
      expect(result).toBeInstanceOf(Array);
    });
  });
  describe('getOne', () => {
    it('should return a movie', () => {
      service.create({
        title: 'Test Movie',
        genres: ['test'],
        year: 2020,
      });
      const movie = service.getOne(1);
      // 정의 되어있는지 체크
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
      expect(movie.title).toEqual('Test Movie');
      expect(movie.genres).toHaveLength(1);
      expect(movie.genres[0]).toEqual('test');
      expect(movie.year).toEqual(2020);
    });
    it('should throw 404 error', () => {
      try {
        service.getOne(999);
      } catch (err) {
        // NotFoundException 인지 체크
        expect(err).toBeInstanceOf(NotFoundException);
        expect(err.message).toEqual('movie not found! 999');
      }
    });
  });

  describe('deleteOne', () => {
    it('delete a movie', () => {
      service.create({
        title: 'Test Movie',
        genres: ['test'],
        year: 2020,
      });

      const beforeDelete = service.getAll();
      service.deleteOne(1);

      const afterDelete = service.getAll();
      expect(afterDelete.length).toBeLessThan(beforeDelete.length);
    });

    it('should return a 404', () => {
      try {
        service.deleteOne(999);
      } catch (err) {
        expect(err).toBeInstanceOf(NotFoundException);
        expect(err.message).toEqual('movie not found! 999');
      }
    });
  });

  describe('create', () => {
    it('should create a movie', () => {
      const beforeCreate = service.getAll().length;
      service.create({
        title: 'Test Movie',
        year: 2020,
        genres: ['test'],
      });
      const afterCreate = service.getAll().length;

      expect(afterCreate).toBeGreaterThan(beforeCreate);
    });
  });

  describe('update', () => {
    it('should update a movie', () => {
      service.create({
        title: 'Test Movie',
        year: 2020,
        genres: ['test'],
      });
      service.update(1, { title: 'Updated Test' });
      const movie = service.getOne(1);
      expect(movie.title).toEqual('Updated Test');
    });
    it('should return a 404', () => {
      try {
        service.update(999, { title: 'Updated Test' });
      } catch (err) {
        expect(err).toBeInstanceOf(NotFoundException);
        expect(err.message).toEqual('movie not found! 999');
      }
    });
  });

  describe('search', () => {
    it('should be search movie', () => {
      service.create({
        title: 'Test Movie',
        year: 2020,
        genres: ['test'],
      });

      const searchMovie = service.search('Test');
      expect(searchMovie).toHaveLength(1);
      const afterSearch = service.search('update');
      expect(afterSearch).toHaveLength(0);
    });
  });
});
