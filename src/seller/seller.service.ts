import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSellerDto } from './dto/create-seller.dto.js';
import { UpdateSellerDto } from './dto/update-seller.dto.js';
import { Seller } from './entities/seller.entity.js';
import { FindSellersQueryDto, PaginatedSellersResponse } from './dto/find-sellers-query.dto.js';

@Injectable()
export class SellerService {
  constructor(
    @InjectRepository(Seller)
    private readonly sellerRepository: Repository<Seller>,
  ) {}

  async create(createSellerDto: CreateSellerDto): Promise<Seller> {
    const newSeller = this.sellerRepository.create(createSellerDto);
    return await this.sellerRepository.save(newSeller);
  }

  async findAll(query: FindSellersQueryDto): Promise<PaginatedSellersResponse> {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const { name, sortBy = 'id', sortOrder = 'ASC' } = query;
  
    const skip = (page - 1) * limit;
  
    const qb = this.sellerRepository
      .createQueryBuilder('seller')
      .leftJoinAndSelect('seller.products', 'product'); 
  
    if (name?.trim()) {
      qb.andWhere('seller.name ILIKE :name', { name: `%${name.trim()}%` });
    }
  
    qb.orderBy(`seller.${sortBy}`, sortOrder)
      .addOrderBy('product.id', 'ASC');
  
    const [data, total] = await qb
      .skip(skip)
      .take(limit)
      .getManyAndCount();
  
    return {
      data,
      meta: {
        page,
        limit,
        total,
        totalPages: total === 0 ? 0 : Math.ceil(total / limit),
      },
    };
  }
  

  async findOne(id: number): Promise<Seller> {
    const seller = await this.sellerRepository.findOne({
      where: { id },
      relations: {
        products: true,
      },
    });
    
    if (!seller) {
      throw new NotFoundException(`Продавец с ID ${id} не найден`);
    }
    
    return seller;
  }

  async update(id: number, updateSellerDto: UpdateSellerDto): Promise<Seller> {
    const seller = await this.findOne(id);
    Object.assign(seller, updateSellerDto);
    return await this.sellerRepository.save(seller);
  }

  async remove(id: number): Promise<void> {
    const seller = await this.findOne(id);
    await this.sellerRepository.remove(seller);
  }
}
