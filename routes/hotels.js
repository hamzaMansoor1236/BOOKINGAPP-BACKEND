import express from "express"
import { createHotel, deleteHotel, updateHotel ,getHotel, getHotels, countByCity } from "../controllers/hotels.js";
import { verifyAdmin } from "../utils/verifyToken.js";
const router = express.Router();

//CREATE
router.post("/",verifyAdmin, createHotel)

//UPDATE
router.put("/:id",verifyAdmin, updateHotel)

//DELETE
router.delete("/:id",verifyAdmin, deleteHotel)

//GET
router.get("/find/:id", getHotel)

//GET ALL
router.get("/", getHotels)

//GET count by cities
router.get("/countByCity", countByCity)


// router.get("/countByType", getHotels)

export default router;