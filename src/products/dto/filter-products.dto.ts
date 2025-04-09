import { IsOptional, IsNumber, IsString, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class FilterProductsDto {
  @IsString()
  @IsOptional()
  search?: string;

  @IsString()
  @IsOptional()
  category?: string;

  @IsNumber()
  @IsOptional()
  @Min(0)
  @Type(() => Number)
  minPrice?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  @Type(() => Number)
  maxPrice?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(5)
  @Type(() => Number)
  minRating?: number;

  @IsString()
  @IsOptional()
  sortBy?: 'price' | 'rating' | 'name';

  @IsString()
  @IsOptional()
  sortOrder?: 'ASC' | 'DESC';

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  page?: number = 1;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  limit?: number = 10;
}
