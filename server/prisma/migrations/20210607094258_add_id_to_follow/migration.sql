/*
  Warnings:

  - The primary key for the `Follow` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[followedId,followerId]` on the table `Follow` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Follow" DROP CONSTRAINT "Follow_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "Follow.followedId_followerId_unique" ON "Follow"("followedId", "followerId");
