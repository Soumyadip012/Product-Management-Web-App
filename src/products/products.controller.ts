import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Param, 
  Delete, 
  Patch, 
  UseGuards,
  Query 
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FilterProductsDto } from './dto/filter-products.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  createProduct(
    @Body() createProductDto: CreateProductDto,
    @GetUser() user: User,
  ) {
    return this.productsService.createProduct(createProductDto, user);
  }

  @Get()
  getAllProducts(@Query() filterDto: FilterProductsDto) {
    return this.productsService.getAllProducts(filterDto);
  }

  @Get(':id')
  getProductById(@Param('id') id: string) {
    return this.productsService.getProductById(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  updateProduct(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
    @GetUser() user: User,
  ) {
    return this.productsService.updateProduct(id, updateProductDto, user);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  deleteProduct(
    @Param('id') id: string,
    @GetUser() user: User,
  ) {
    return this.productsService.deleteProduct(id, user);
  }
}
