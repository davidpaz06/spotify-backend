/*
  Warnings:

  - You are about to drop the column `album_id` on the `Song` table. All the data in the column will be lost.
  - You are about to drop the column `artist_id` on the `Song` table. All the data in the column will be lost.
  - You are about to drop the column `song_length` on the `Song` table. All the data in the column will be lost.
  - You are about to drop the column `song_name` on the `Song` table. All the data in the column will be lost.
  - You are about to drop the column `streams` on the `Song` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Song" DROP CONSTRAINT "Song_album_id_fkey";

-- DropForeignKey
ALTER TABLE "Song" DROP CONSTRAINT "Song_artist_id_fkey";

-- AlterTable
ALTER TABLE "Song" DROP COLUMN "album_id",
DROP COLUMN "artist_id",
DROP COLUMN "song_length",
DROP COLUMN "song_name",
DROP COLUMN "streams";
