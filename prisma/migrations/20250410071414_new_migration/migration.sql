/*
  Warnings:

  - A unique constraint covering the columns `[playlist_id,song_id]` on the table `PlaylistSong` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "PlaylistSong_playlist_id_song_id_key" ON "PlaylistSong"("playlist_id", "song_id");
