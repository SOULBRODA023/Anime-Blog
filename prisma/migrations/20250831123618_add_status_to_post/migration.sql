-- CreateEnum
CREATE TYPE "public"."PostStatus" AS ENUM ('DRAFT', 'PUBLISHED');

-- AlterTable
ALTER TABLE "public"."Post" ADD COLUMN     "status" "public"."PostStatus" NOT NULL DEFAULT 'DRAFT';
