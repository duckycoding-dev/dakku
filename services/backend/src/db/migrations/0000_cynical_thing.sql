CREATE TABLE "kanjis" (
	"id" serial PRIMARY KEY NOT NULL,
	"literal" text NOT NULL,
	"codepoints" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"radicals" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"misc" jsonb,
	"dictionary_references" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"query_codes" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"readings_meanings" jsonb DEFAULT '[]'::jsonb NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sentences" (
	"id" serial PRIMARY KEY NOT NULL,
	"japanese" text,
	"english" text
);
--> statement-breakpoint
CREATE TABLE "vocabulary" (
	"id" integer PRIMARY KEY NOT NULL,
	"kanji" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"readings" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"senses" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"tags" text[] DEFAULT '{}' NOT NULL,
	"priorities" text[] DEFAULT '{}' NOT NULL
);
