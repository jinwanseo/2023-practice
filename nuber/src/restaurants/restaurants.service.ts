import {
  DeleteRestaurantInput,
  DeleteRestaurantOutput,
} from './dtos/delete-restaurant.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Restaurant } from './entities/restaurant.entity';
import { ILike, Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import {
  CreateRestaurantInput,
  CreateRestaurantOutput,
} from './dtos/create-restaurant.dto';
import { CategoryRepository } from './repositories/category.repository';
import { EditRestaurantInput } from './dtos/edit-restaurant.dto';
import { Category } from './entities/category.entity';
import {
  ReadRestaurantsInput,
  ReadRestaurantsOutput,
} from './dtos/read-restaurants.dto';
import {
  ReadRestaurantInput,
  ReadRestaurantOutput,
} from './dtos/read-restaurant.dto';
import {
  SearchRestaurantInput,
  SearchRestaurantOutput,
} from './dtos/search-restaurant.dto';

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectRepository(Restaurant)
    private readonly restaurants: Repository<Restaurant>,
    private readonly categories: CategoryRepository,
  ) {}

  async createRestaurant(
    owner: User,
    { categoryName, ...others }: CreateRestaurantInput,
  ): Promise<CreateRestaurantOutput> {
    try {
      const category = await this.categories.getOrCreate(categoryName);
      await this.restaurants.save(
        this.restaurants.create({
          owner,
          category,
          ...others,
        }),
      );
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async editRestaurant(
    owner: User,
    { restaurantId, categoryName, ...others }: EditRestaurantInput,
  ) {
    try {
      const restaurant = await this.restaurants.findOne({
        where: { id: restaurantId },
      });
      if (!restaurant) throw new Error('restaurant not found');
      if (restaurant.ownerId !== owner.id) throw new Error('failed owner');

      const category = categoryName
        ? await this.categories.getOrCreate(categoryName)
        : null;

      await this.restaurants.save([
        {
          id: restaurant.id,
          ...(category && { category }),
          ...others,
        },
      ]);
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async deleteRestaurant(
    owner: User,
    { restaurantId }: DeleteRestaurantInput,
  ): Promise<DeleteRestaurantOutput> {
    try {
      const restaurant = await this.restaurants.findOne({
        where: { id: restaurantId },
      });
      if (!restaurant) throw new Error('restaurant not found');
      if (restaurant.ownerId !== owner.id)
        throw new Error('search failed owner');

      await this.restaurants.delete(restaurantId);
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async allRestaurants({
    page,
  }: ReadRestaurantsInput): Promise<ReadRestaurantsOutput> {
    try {
      const [results, total] = await this.restaurants.findAndCount({
        skip: (page - 1) * 3,
        take: 3,
      });
      return {
        ok: true,
        results,
        total,
        totalPages: Math.ceil(total / 3),
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async findRestaurantById({
    restaurantId,
  }: ReadRestaurantInput): Promise<ReadRestaurantOutput> {
    try {
      const restaurant = await this.restaurants.findOne({
        where: { id: restaurantId },
      });
      if (!restaurant) throw new Error('restaurant not found');

      return {
        ok: true,
        result: restaurant,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async searchRestaurantsByName({
    keyword,
    page,
  }: SearchRestaurantInput): Promise<SearchRestaurantOutput> {
    try {
      const [results, total] = await this.restaurants.findAndCount({
        where: {
          name: ILike(`%${keyword}%`),
        },
        skip: (page - 1) * 5,
        take: 5,
      });

      return {
        results,
        total,
        totalPages: Math.ceil(total / 5),
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async allCategories() {}

  countRestaurants() {}

  findCategoryBySlug() {}
}
