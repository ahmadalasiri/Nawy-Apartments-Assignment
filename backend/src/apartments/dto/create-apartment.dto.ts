import {
  IsString,
  IsNumber,
  IsInt,
  Min,
  IsArray,
  IsOptional,
  IsNotEmpty,
  MaxLength,
} from 'class-validator';

export class CreateApartmentDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  unitNumber: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  project: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsInt()
  @Min(0)
  bedrooms: number;

  @IsInt()
  @Min(0)
  bathrooms: number;

  @IsNumber()
  @Min(0)
  area: number;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  images?: string[];
}

