/*
  Warnings:

  - Added the required column `name` to the `Manager` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Manager` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Manager" ADD COLUMN     "email" TEXT,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL;
