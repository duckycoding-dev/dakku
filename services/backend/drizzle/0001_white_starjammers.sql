ALTER TABLE "vocabulary" ALTER COLUMN "id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "vocabulary" ADD COLUMN "kanji" jsonb[];--> statement-breakpoint
ALTER TABLE "vocabulary" ADD COLUMN "readings" jsonb[];--> statement-breakpoint
ALTER TABLE "vocabulary" ADD COLUMN "senses" jsonb[];--> statement-breakpoint
ALTER TABLE "vocabulary" ADD COLUMN "tags" text[];--> statement-breakpoint
ALTER TABLE "vocabulary" ADD COLUMN "priority" text[];--> statement-breakpoint
ALTER TABLE "vocabulary" ADD COLUMN "created_at" integer DEFAULT extract(epoch from now()) NOT NULL;--> statement-breakpoint
ALTER TABLE "vocabulary" ADD COLUMN "updated_at" integer DEFAULT extract(epoch from now()) NOT NULL;--> statement-breakpoint
ALTER TABLE "vocabulary" DROP COLUMN "reading";--> statement-breakpoint
ALTER TABLE "vocabulary" DROP COLUMN "meaning";