-- CreateEnum
CREATE TYPE "ProfileType" AS ENUM ('PUBLIC', 'PRIVATE');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "profileType" "ProfileType" NOT NULL DEFAULT E'PUBLIC';
