import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FilterProductsDto } from './dto/filter-products.dto';
import { User } from '../auth/user.entity';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    createProduct(createProductDto: CreateProductDto, user: User): Promise<import("./product.entity").Product>;
    getAllProducts(filterDto: FilterProductsDto): Promise<{
        data: import("./product.entity").Product[];
        total: number;
    }>;
    getProductById(id: string): Promise<import("./product.entity").Product>;
    updateProduct(id: string, updateProductDto: UpdateProductDto, user: User): Promise<import("./product.entity").Product>;
    deleteProduct(id: string, user: User): Promise<void>;
}
