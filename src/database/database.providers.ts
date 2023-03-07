import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'jinwanseo',
        // password: 'root',
        database: 'nuber-eats',
        synchronize: true,
        logging: true,
      });

      return dataSource.initialize();
    },
  },
];
