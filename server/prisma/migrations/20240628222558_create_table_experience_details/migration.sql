/*
  Warnings:

  - You are about to drop the column `createdAt` on the `cover_letters` table. All the data in the column will be lost.
  - You are about to drop the column `details` on the `cover_letters` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `cover_letters` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `work_experiences` table. All the data in the column will be lost.
  - You are about to drop the column `details` on the `work_experiences` table. All the data in the column will be lost.
  - You are about to drop the column `jobTitle` on the `work_experiences` table. All the data in the column will be lost.
  - You are about to drop the column `profileId` on the `work_experiences` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `work_experiences` table. All the data in the column will be lost.
  - You are about to drop the `other_highlights` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `profiles` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[username]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,job_title,company]` on the table `work_experiences` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `text` to the `cover_letters` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `job_title` to the `work_experiences` table without a default value. This is not possible if the table is not empty.

*/
-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "vector";

-- DropForeignKey
ALTER TABLE "other_highlights" DROP CONSTRAINT "other_highlights_profileId_fkey";

-- DropForeignKey
ALTER TABLE "other_highlights" DROP CONSTRAINT "other_highlights_userId_fkey";

-- DropForeignKey
ALTER TABLE "profiles" DROP CONSTRAINT "profiles_userId_fkey";

-- DropForeignKey
ALTER TABLE "work_experiences" DROP CONSTRAINT "work_experiences_profileId_fkey";

-- DropIndex
DROP INDEX "users_email_key";

-- DropIndex
DROP INDEX "work_experiences_userId_jobTitle_company_key";

-- AlterTable
ALTER TABLE "cover_letters" DROP COLUMN "createdAt",
DROP COLUMN "details",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "text" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "createdAt",
DROP COLUMN "email",
DROP COLUMN "name",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "password" VARCHAR(255) NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "username" VARCHAR(100) NOT NULL;

-- AlterTable
ALTER TABLE "work_experiences" DROP COLUMN "createdAt",
DROP COLUMN "details",
DROP COLUMN "jobTitle",
DROP COLUMN "profileId",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "job_title" VARCHAR(50) NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "other_highlights";

-- DropTable
DROP TABLE "profiles";

-- CreateTable
CREATE TABLE "other_experiences" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "other_experiences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "experience_details" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "embedding" vector(384) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "workExperienceId" INTEGER,
    "otherExperienceId" INTEGER,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "experience_details_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "other_experiences_userId_idx" ON "other_experiences"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "other_experiences_userId_title_key" ON "other_experiences"("userId", "title");

-- CreateIndex
CREATE INDEX "experience_details_userId_idx" ON "experience_details"("userId");

-- CreateIndex
CREATE INDEX "experience_details_workExperienceId_idx" ON "experience_details"("workExperienceId");

-- CreateIndex
CREATE INDEX "experience_details_otherExperienceId_idx" ON "experience_details"("otherExperienceId");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "work_experiences_userId_job_title_company_key" ON "work_experiences"("userId", "job_title", "company");

-- AddForeignKey
ALTER TABLE "other_experiences" ADD CONSTRAINT "other_experiences_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "experience_details" ADD CONSTRAINT "experience_details_workExperienceId_fkey" FOREIGN KEY ("workExperienceId") REFERENCES "work_experiences"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "experience_details" ADD CONSTRAINT "experience_details_otherExperienceId_fkey" FOREIGN KEY ("otherExperienceId") REFERENCES "other_experiences"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "experience_details" ADD CONSTRAINT "experience_details_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
