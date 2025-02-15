ALTER TABLE "vocabulary" ALTER COLUMN "kanji" SET DATA TYPE jsonb[];--> statement-breakpoint
ALTER TABLE "vocabulary" ALTER COLUMN "readings" SET DATA TYPE jsonb[];--> statement-breakpoint
ALTER TABLE "vocabulary" ALTER COLUMN "readings" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "vocabulary" ALTER COLUMN "senses" SET DATA TYPE jsonb[];--> statement-breakpoint
ALTER TABLE "vocabulary" ALTER COLUMN "senses" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "vocabulary" ALTER COLUMN "tags" SET DATA TYPE text[];--> statement-breakpoint
ALTER TABLE "vocabulary" ALTER COLUMN "tags" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "vocabulary" ALTER COLUMN "priorities" SET DATA TYPE text[];--> statement-breakpoint
ALTER TABLE "vocabulary" ALTER COLUMN "priorities" DROP DEFAULT;