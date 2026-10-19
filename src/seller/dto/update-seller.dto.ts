import { PartialType } from '@nestjs/mapped-types';
import { CreateSellerDto } from './create-seller.dto.js';

export class UpdateSellerDto extends PartialType(CreateSellerDto) {}
