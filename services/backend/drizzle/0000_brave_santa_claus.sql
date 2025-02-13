CREATE TABLE "kanjis" (
	"id" text PRIMARY KEY NOT NULL,
	"grade" integer,
	"stroke_count" jsonb,
	"frequency" integer,
	"jlpt_level" integer,
	"radical_names" jsonb,
	"nanori" jsonb,
	"meanings" jsonb,
	"readings" jsonb,
	"query_codes" jsonb,
	"codepoints" jsonb,
	"dictionary_refs" jsonb,
	"variants" jsonb
);
--> statement-breakpoint
CREATE TABLE "sentences" (
	"id" serial PRIMARY KEY NOT NULL,
	"japanese" text,
	"english" text
);
--> statement-breakpoint
CREATE TABLE "vocabulary" (
	"id" text PRIMARY KEY NOT NULL,
	"reading" text,
	"meaning" text
);
