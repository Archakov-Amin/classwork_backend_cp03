import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateSellerDto {
  @ApiProperty({ example: 'Иванов Иван Иванович' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  name: string;

  @ApiProperty({ example: 'seller@example.com' })
  @IsString()
  @IsNotEmpty()
  email: string;
}