import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApartmentsService } from './apartments.service';
import { CreateApartmentDto } from './dto/create-apartment.dto';
import { SearchApartmentsDto } from './dto/search-apartments.dto';

@Controller('apartments')
export class ApartmentsController {
  constructor(private readonly apartmentsService: ApartmentsService) {}

  @Post()
  create(@Body() createApartmentDto: CreateApartmentDto) {
    return this.apartmentsService.create(createApartmentDto);
  }

  @Get()
  findAll(@Query() searchDto: SearchApartmentsDto) {
    return this.apartmentsService.findAll(searchDto);
  }

  @Get('projects')
  getProjects() {
    return this.apartmentsService.getUniqueProjects();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.apartmentsService.findOne(id);
  }
}

