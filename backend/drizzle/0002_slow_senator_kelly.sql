CREATE TABLE "categories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "topic_category_map" (
	"id" serial PRIMARY KEY NOT NULL,
	"category_id" uuid,
	"topic_id" uuid
);
--> statement-breakpoint
ALTER TABLE "topic_category_map" ADD CONSTRAINT "topic_category_map_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "topic_category_map" ADD CONSTRAINT "topic_category_map_topic_id_topics_id_fk" FOREIGN KEY ("topic_id") REFERENCES "public"."topics"("id") ON DELETE no action ON UPDATE no action;