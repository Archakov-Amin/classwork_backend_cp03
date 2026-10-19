import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';
import { Product } from './entities/product.entity.js';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const newProduct = this.productRepository.create({
      title: createProductDto.title,
      price: createProductDto.price,
      seller: { id: createProductDto.sellerId } as any,
    });
    return await this.productRepository.save(newProduct);
  }

  async findAll(): Promise<Product[]> {
    return await this.productRepository.find({
      relations: { seller: true },
    });
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: { seller: true },
    });

    if (!product) {
      throw new NotFoundException(`Товар с ID ${id} не найден`);
    }

    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
    const product = await this.findOne(id);
    
    if (updateProductDto.sellerId) {
      product.seller = { id: updateProductDto.sellerId } as any;
    }
    
    Object.assign(product, {
      title: updateProductDto.title ?? product.title,
      price: updateProductDto.price ?? product.price,
    });

    return await this.productRepository.save(product);
  }

  async remove(id: number): Promise<void> {
    const product = await this.findOne(id);
    await this.productRepository.remove(product);
  }
}
