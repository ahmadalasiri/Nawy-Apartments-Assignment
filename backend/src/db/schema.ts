import { pgTable, uuid, varchar, text, decimal, integer, timestamp, index, json } from 'drizzle-orm/pg-core';

// Apartments table
export const apartments = pgTable(
  'apartments',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    unitNumber: varchar('unit_number', { length: 50 }).notNull().unique(),
    name: varchar('name', { length: 255 }).notNull(),
    project: varchar('project', { length: 255 }).notNull(),
    description: text('description').notNull(),
    price: decimal('price', { precision: 12, scale: 2 }).notNull(),
    bedrooms: integer('bedrooms').notNull(),
    bathrooms: integer('bathrooms').notNull(),
    area: decimal('area', { precision: 10, scale: 2 }).notNull(),
    images: json('images').$type<string[]>().notNull().default([]),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
  },
  (table) => ({
    projectIdx: index('project_idx').on(table.project),
    unitNumberIdx: index('unit_number_idx').on(table.unitNumber),
    projectUnitIdx: index('project_unit_idx').on(table.project, table.unitNumber),
  })
);

