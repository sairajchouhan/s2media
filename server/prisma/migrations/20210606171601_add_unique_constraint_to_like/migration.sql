/*
  Warnings:

  - A unique constraint covering the columns `[userId,postId]` on the table `Like` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Like.userId_postId_unique" ON "Like"("userId", "postId");
