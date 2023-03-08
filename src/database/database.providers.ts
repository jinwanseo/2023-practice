import { Restaurant } from 'src/restaurants/entities/restaurant.entity';
import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: process.env.DB_HOST,
        port: +process.env.DB_PORT,
        username: process.env.DB_USERNAME,
        // password: 'root',
        database: process.env.DB_DATABASE,
        synchronize: true,
        logging: true,
        entities: [Restaurant],
      });

      return dataSource.initialize();
    },
  },
];
