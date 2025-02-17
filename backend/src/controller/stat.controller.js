import { User } from "../models/user.model.js";
import { Song } from "../models/song.model.js";
import { Album } from "../models/album.model.js";

export const getStats = async (req, res, next) => {
  try {
    const [
      totalUsers,
      totalSongs,
      totalAlbums,
      uniqueSongArtists,
      uniqueAlbumArtists,
    ] = await Promise.all([
      User.countDocuments(),
      Song.countDocuments(),
      Album.countDocuments(),
      Song.distinct("artist"), // Get unique artists from Song collection
      Album.distinct("artist"), // Get unique artists from Album collection
    ]);

    // Combine unique artists from both collections
    const uniqueArtists = new Set([
      ...uniqueSongArtists,
      ...uniqueAlbumArtists,
    ]);
    const totalArtists = uniqueArtists.size;

    res.status(200).json({
      totalUsers,
      totalSongs,
      totalAlbums,
      totalArtists,
    });
  } catch (error) {
    console.log("Error in getStats controller", error);
    next(error);
  }
};
