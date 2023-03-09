import { DataSource } from 'typeorm';
import { Restaurant } from './entities/restaurant.entity';

export const restaurantProviders = [
  {
    provide: 'RESTAURANT_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(Restaurant),
    inject: ['DATA_SOURCE'],
  },
];
