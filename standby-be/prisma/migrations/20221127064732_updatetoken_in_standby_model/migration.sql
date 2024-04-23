/*
  Warnings:

  - You are about to drop the column `userToken` on the `StandBy` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "StandBy" DROP COLUMN "userToken",
ADD COLUMN     "token" TEXT;
