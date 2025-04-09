export declare class FilterProductsDto {
    search?: string;
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    minRating?: number;
    sortBy?: 'price' | 'rating' | 'name';
    sortOrder?: 'ASC' | 'DESC';
    page?: number;
    limit?: number;
}
