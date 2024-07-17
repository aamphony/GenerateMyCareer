/*
  Warnings:

  - You are about to drop the column `years` on the `work_experiences` table. All the data in the column will be lost.
  - Added the required column `start_month` to the `work_experiences` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_year` to the `work_experiences` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "work_experiences" DROP COLUMN "years",
ADD COLUMN     "end_month" INTEGER,
ADD COLUMN     "end_year" INTEGER,
ADD COLUMN     "start_month" INTEGER NOT NULL,
ADD COLUMN     "start_year" INTEGER NOT NULL;
