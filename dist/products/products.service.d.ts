import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FilterProductsDto } from './dto/filter-products.dto';
import { User } from '../auth/user.entity';
export declare class ProductsService {
    private productRepository;
    constructor(productRepository: Repository<Product>);
    createProduct(createProductDto: CreateProductDto, user: User): Promise<Product>;
    getAllProducts(filterDto: FilterProductsDto): Promise<{
        data: Product[];
        total: number;
    }>;
    getProductById(id: string): Promise<Product>;
    updateProduct(id: string, updateProductDto: UpdateProductDto, user: User): Promise<Product>;
    deleteProduct(id: string, user: User): Promise<void>;
}
