ALTER TABLE "activities" ADD CONSTRAINT "activities_title_unique" UNIQUE("title");--> statement-breakpoint
ALTER TABLE "rewards" ADD CONSTRAINT "rewards_title_unique" UNIQUE("title");