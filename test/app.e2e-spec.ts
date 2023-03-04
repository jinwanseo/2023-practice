import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  // beforeEach (it 실행 될때마다 실행)
  // beforeAll (모든 It 실행시 처음 한번만 실행)
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    // 서비스 환경과 같도록 설정 필수!
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();
  });

  describe('/movies', () => {
    it('GET', () => {
      return request(app.getHttpServer()).get('/movies').expect(200).expect([]);
    });

    it('POST', () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({
          title: 'jinwan',
          year: 2020,
          genres: ['action'],
        })
        .expect(201);
    });
  });

  describe('/movies/:id', () => {
    it('GET 200', () => {
      return request(app.getHttpServer()).get('/movies/1').expect(200);
    });
    it('PATCH 200', () => {
      return request(app.getHttpServer())
        .patch('/movies/1')
        .send({
          title: 'jinwanseo',
        })
        .expect(200);
    });
    it('GET 200', () => {
      return request(app.getHttpServer())
        .get('/movies/1')
        .expect(200)
        .expect({
          id: 1,
          title: 'jinwanseo',
          year: 2020,
          genres: ['action'],
        });
    });
    it('POST 200', () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({
          title: 'jinwan',
          year: 1987,
          genres: ['drama'],
        })
        .expect(201);
    });
    it('POST 400', () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({
          title: 'jinwan',
          year: 1987,
          genres: ['drama'],
          hack: 'this',
        })
        .expect(400);
    });

    it('DELETE 200', () => {
      return request(app.getHttpServer()).delete('/movies/1').expect(200);
    });
    it('DELETE 404', () => {
      return request(app.getHttpServer()).delete('/movies/999').expect(404);
    });

    // it.todo('DELETE 200');
  });
});
