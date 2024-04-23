import { DataSource, Repository } from 'typeorm';
import { Category } from '../entities/category.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoryRepository extends Repository<Category> {
  constructor(private dataSource: DataSource) {
    super(Category, dataSource.createEntityManager());
  }

  async getOrCreate(categoryName: string): Promise<Category> {
    let category: Category = null;
    const cname = categoryName.trim().toLowerCase();
    const slug = cname.replace(/ /g, '-');
    category = await this.findOne({ where: { slug } });
    if (!category) {
      category = await this.save(
        this.create({
          name: cname,
          slug,
        }),
      );
    }
    return category;
  }
}
