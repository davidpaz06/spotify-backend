/*
  Warnings:

  - You are about to drop the column `is_explicit` on the `Song` table. All the data in the column will be lost.
  - Added the required column `song_data` to the `Song` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Song" DROP COLUMN "is_explicit",
ADD COLUMN     "song_data" JSONB NOT NULL;
