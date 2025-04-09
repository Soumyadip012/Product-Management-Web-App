import { User } from '../auth/user.entity';
export declare class Product {
    id: string;
    name: string;
    description: string;
    category: string;
    price: number;
    rating: number;
    imageUrl: string;
    user: User;
    userId: string;
}
