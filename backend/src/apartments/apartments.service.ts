import {
  Injectable,
  Inject,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { eq, and, gte, lte, sql, or, ilike } from 'drizzle-orm';
import { DB_CONNECTION } from '../db/db.module';
import * as schema from '../db/schema';
import { CreateApartmentDto } from './dto/create-apartment.dto';
import { SearchApartmentsDto } from './dto/search-apartments.dto';
import { PaginatedResponse } from '../common/dto/pagination.dto';

@Injectable()
export class ApartmentsService {
  constructor(
    @Inject(DB_CONNECTION)
    private db: PostgresJsDatabase<typeof schema>,
  ) {}

  async create(createApartmentDto: CreateApartmentDto) {
    try {
      const [apartment] = await this.db
        .insert(schema.apartments)
        .values({
          unitNumber: createApartmentDto.unitNumber,
          name: createApartmentDto.name,
          project: createApartmentDto.project,
          description: createApartmentDto.description,
          price: createApartmentDto.price.toString(),
          bedrooms: createApartmentDto.bedrooms,
          bathrooms: createApartmentDto.bathrooms,
          area: createApartmentDto.area.toString(),
          images: createApartmentDto.images || [],
        })
        .returning();

      return apartment;
    } catch (error: any) {
      if (error.code === '23505') {
        // Unique constraint violation
        throw new ConflictException(
          `Apartment with unit number ${createApartmentDto.unitNumber} already exists`,
        );
      }
      throw error;
    }
  }

  async findAll(
    searchDto: SearchApartmentsDto,
  ): Promise<PaginatedResponse<any>> {
    const page = searchDto.page || 1;
    const limit = searchDto.limit || 12;
    const offset = (page - 1) * limit;

    // Build where conditions
    const conditions = [];

    // Search by unit name, unit number, or project
    if (searchDto.search) {
      const searchTerm = `%${searchDto.search}%`;
      conditions.push(
        or(
          ilike(schema.apartments.name, searchTerm),
          ilike(schema.apartments.unitNumber, searchTerm),
          ilike(schema.apartments.project, searchTerm),
        ),
      );
    }

    // Filter by project
    if (searchDto.project) {
      conditions.push(ilike(schema.apartments.project, searchDto.project));
    }

    // Filter by price range
    if (searchDto.minPrice !== undefined) {
      conditions.push(
        gte(
          sql`CAST(${schema.apartments.price} AS DECIMAL)`,
          searchDto.minPrice,
        ),
      );
    }
    if (searchDto.maxPrice !== undefined) {
      conditions.push(
        lte(
          sql`CAST(${schema.apartments.price} AS DECIMAL)`,
          searchDto.maxPrice,
        ),
      );
    }

    // Filter by bedrooms
    if (searchDto.bedrooms !== undefined) {
      conditions.push(eq(schema.apartments.bedrooms, searchDto.bedrooms));
    }

    // Filter by bathrooms
    if (searchDto.bathrooms !== undefined) {
      conditions.push(eq(schema.apartments.bathrooms, searchDto.bathrooms));
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    // Execute queries in parallel
    const [totalResult, apartments] = await Promise.all([
      this.db
        .select({ count: sql<number>`count(*)::int` })
        .from(schema.apartments)
        .where(whereClause),
      this.db
        .select()
        .from(schema.apartments)
        .where(whereClause)
        .orderBy(schema.apartments.createdAt)
        .limit(limit)
        .offset(offset),
    ]);

    const total = totalResult[0]?.count || 0;
    const totalPages = Math.ceil(total / limit);

    return {
      data: apartments,
      meta: {
        total,
        page,
        limit,
        totalPages,
      },
    };
  }

  async findOne(id: string) {
    const apartment = await this.db.query.apartments.findFirst({
      where: eq(schema.apartments.id, id),
    });

    if (!apartment) {
      throw new NotFoundException(`Apartment with ID ${id} not found`);
    }

    return apartment;
  }

  async getUniqueProjects(): Promise<string[]> {
    const result = await this.db
      .selectDistinct({ project: schema.apartments.project })
      .from(schema.apartments)
      .orderBy(schema.apartments.project);

    return result.map((r) => r.project);
  }
}

