import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, MaxLength, Min } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: 'Смартфон' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  title: string;

  @ApiProperty({ example: 999.99 })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsNotEmpty()
  sellerId: number;
}
