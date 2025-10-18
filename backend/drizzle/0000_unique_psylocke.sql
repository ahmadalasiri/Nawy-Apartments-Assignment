CREATE TABLE "apartments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"unit_number" varchar(50) NOT NULL,
	"name" varchar(255) NOT NULL,
	"project" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"price" numeric(12, 2) NOT NULL,
	"bedrooms" integer NOT NULL,
	"bathrooms" integer NOT NULL,
	"area" numeric(10, 2) NOT NULL,
	"images" json DEFAULT '[]'::json NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "apartments_unit_number_unique" UNIQUE("unit_number")
);
--> statement-breakpoint
CREATE INDEX "project_idx" ON "apartments" USING btree ("project");--> statement-breakpoint
CREATE INDEX "unit_number_idx" ON "apartments" USING btree ("unit_number");--> statement-breakpoint
CREATE INDEX "project_unit_idx" ON "apartments" USING btree ("project","unit_number");