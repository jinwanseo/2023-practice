/*
  Warnings:

  - Added the required column `fileName` to the `Photo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Photo" ADD COLUMN     "fileName" TEXT NOT NULL;
