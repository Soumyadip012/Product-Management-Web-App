import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, Between } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FilterProductsDto } from './dto/filter-products.dto';
import { User } from '../auth/user.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async createProduct(
    createProductDto: CreateProductDto,
    user: User,
  ): Promise<Product> {
    const product = this.productRepository.create({
      ...createProductDto,
      user,
    });

    return this.productRepository.save(product);
  }

  async getAllProducts(filterDto: FilterProductsDto): Promise<{ data: Product[]; total: number }> {
    const { 
      search, 
      category, 
      minPrice, 
      maxPrice, 
      minRating, 
      sortBy = 'name',
      sortOrder = 'ASC',
      page = 1,
      limit = 10
    } = filterDto;

    const queryBuilder = this.productRepository.createQueryBuilder('product');
    
    // Apply filters
    if (search) {
      queryBuilder.andWhere(
        '(product.name LIKE :search OR product.description LIKE :search)',
        { search: `%${search}%` },
      );
    }

    if (category) {
      queryBuilder.andWhere('product.category = :category', { category });
    }

    if (minPrice !== undefined) {
      queryBuilder.andWhere('product.price >= :minPrice', { minPrice });
    }

    if (maxPrice !== undefined) {
      queryBuilder.andWhere('product.price <= :maxPrice', { maxPrice });
    }

    if (minRating !== undefined) {
      queryBuilder.andWhere('product.rating >= :minRating', { minRating });
    }

    // Count total before pagination
    const total = await queryBuilder.getCount();

    // Apply sorting
    queryBuilder.orderBy(`product.${sortBy}`, sortOrder);

    // Apply pagination
    queryBuilder.skip((page - 1) * limit);
    queryBuilder.take(limit);

    const data = await queryBuilder.getMany();
    
    return { data, total };
  }

  async getProductById(id: string): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id } });

    if (!product) {
      throw new NotFoundException(`Product with ID "${id}" not found`);
    }

    return product;
  }

  async updateProduct(
    id: string,
    updateProductDto: UpdateProductDto,
    user: User,
  ): Promise<Product> {
    const product = await this.getProductById(id);

    // Check if user owns the product or is admin
    if (product.userId !== user.id && user.role !== 'admin') {
      throw new ForbiddenException('You do not have permission to update this product');
    }

    // Update product
    Object.assign(product, updateProductDto);

    return this.productRepository.save(product);
  }

  async deleteProduct(id: string, user: User): Promise<void> {
    const product = await this.getProductById(id);

    // Check if user owns the product or is admin
    if (product.userId !== user.id && user.role !== 'admin') {
      throw new ForbiddenException('You do not have permission to delete this product');
    }

    await this.productRepository.remove(product);
  }
}
