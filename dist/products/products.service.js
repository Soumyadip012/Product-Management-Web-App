"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const product_entity_1 = require("./product.entity");
let ProductsService = class ProductsService {
    constructor(productRepository) {
        this.productRepository = productRepository;
    }
    async createProduct(createProductDto, user) {
        const product = this.productRepository.create(Object.assign(Object.assign({}, createProductDto), { user }));
        return this.productRepository.save(product);
    }
    async getAllProducts(filterDto) {
        const { search, category, minPrice, maxPrice, minRating, sortBy = 'name', sortOrder = 'ASC', page = 1, limit = 10 } = filterDto;
        const queryBuilder = this.productRepository.createQueryBuilder('product');
        if (search) {
            queryBuilder.andWhere('(product.name LIKE :search OR product.description LIKE :search)', { search: `%${search}%` });
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
        const total = await queryBuilder.getCount();
        queryBuilder.orderBy(`product.${sortBy}`, sortOrder);
        queryBuilder.skip((page - 1) * limit);
        queryBuilder.take(limit);
        const data = await queryBuilder.getMany();
        return { data, total };
    }
    async getProductById(id) {
        const product = await this.productRepository.findOne({ where: { id } });
        if (!product) {
            throw new common_1.NotFoundException(`Product with ID "${id}" not found`);
        }
        return product;
    }
    async updateProduct(id, updateProductDto, user) {
        const product = await this.getProductById(id);
        if (product.userId !== user.id && user.role !== 'admin') {
            throw new common_1.ForbiddenException('You do not have permission to update this product');
        }
        Object.assign(product, updateProductDto);
        return this.productRepository.save(product);
    }
    async deleteProduct(id, user) {
        const product = await this.getProductById(id);
        if (product.userId !== user.id && user.role !== 'admin') {
            throw new common_1.ForbiddenException('You do not have permission to delete this product');
        }
        await this.productRepository.remove(product);
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ProductsService);
//# sourceMappingURL=products.service.js.map