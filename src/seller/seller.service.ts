import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSellerDto } from './dto/create-seller.dto.js';
import { UpdateSellerDto } from './dto/update-seller.dto.js';
import { Seller } from './entities/seller.entity.js';

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

  async findAll(): Promise<Seller[]> {
    return await this.sellerRepository.find({
      relations: {
        products: true,
      },
    });
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
