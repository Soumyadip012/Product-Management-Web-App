import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { ConfigModule } from '@nestjs/config';
import { User } from './auth/user.entity';
import { Product } from './products/product.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: ':memory:',
      entities: [User, Product],
      synchronize: true,
    }),
    AuthModule,
    ProductsModule,
  ],
})
export class AppModule {}
