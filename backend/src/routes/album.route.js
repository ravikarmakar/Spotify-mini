import { Router } from "express";
// import { protectRoute } from "../middleware/auth.middleware.js";
import { getAllAlbums, getAlbumsById } from "../controller/album.controller.js";

const router = Router();

router.get("/", getAllAlbums);
router.get("/:albumId", getAlbumsById);

export default router;
