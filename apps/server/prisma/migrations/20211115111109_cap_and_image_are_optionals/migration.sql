-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "url" DROP NOT NULL,
ALTER COLUMN "imagePublicId" DROP NOT NULL;

-- RenameIndex
ALTER INDEX "Profile_userId_unique" RENAME TO "Profile_userId_key";
