import { User } from "../models/user.model.js";
import { Song } from "../models/song.model.js";
import { Album } from "../models/album.model.js";

export const getStats = async (req, res, next) => {
  try {
    const [totalUsers, totalSongs, totalAlbums, uniqueArtists] =
      await Promise.all([
        User.countDocuments(),
        Song.countDocuments(),
        Album.countDocuments(),

        Song.aggregate([
          {
            $unionwith: {
              coll: "albums",
              pipeline: [],
            },
          },
          {
            $group: {
              _id: "$artist",
            },
          },
          {
            $count: "count",
          },
        ]),
      ]);

    res.status(200).json({
      totalUsers,
      totalSongs,
      totalAlbums,
      totalArtists: uniqueArtists[0]?.count || 0,
    });
  } catch (error) {
    console.log("Error in getStats controller", error);
    next(error);
  }
};
