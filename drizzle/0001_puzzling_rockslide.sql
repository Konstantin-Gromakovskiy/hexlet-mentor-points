CREATE TYPE "role" AS ENUM ('tutor', 'admin');
ALTER TABLE "users" ADD COLUMN "role" "role" DEFAULT 'tutor' NOT NULL;
