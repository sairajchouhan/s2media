/*
  Warnings:

  - You are about to drop the column `firstName` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `Profile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "firstName",
DROP COLUMN "lastName",
ADD COLUMN     "displayName" TEXT;
