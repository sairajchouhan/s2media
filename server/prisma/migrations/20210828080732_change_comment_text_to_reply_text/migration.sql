/*
  Warnings:

  - You are about to drop the column `commentText` on the `Reply` table. All the data in the column will be lost.
  - Added the required column `replyText` to the `Reply` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Reply" DROP COLUMN "commentText",
ADD COLUMN     "replyText" TEXT NOT NULL;
