import { Product } from '../products/product.entity';
export declare class User {
    id: string;
    email: string;
    password: string;
    role: string;
    products: Product[];
    hashPassword(): Promise<void>;
}
