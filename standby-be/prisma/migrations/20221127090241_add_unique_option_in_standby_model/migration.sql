/*
  Warnings:

  - A unique constraint covering the columns `[userId,storeId]` on the table `StandBy` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "StandBy_userId_storeId_key" ON "StandBy"("userId", "storeId");
