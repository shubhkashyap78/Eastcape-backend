const express = require("express");
const { listBookings, getBooking, createBooking, updateBooking, deleteBooking, getStats } = require("../controllers/bookingController");
const { auth } = require("../middleware/auth");
const { requireRole } = require("../middleware/roles");
const { requireDb } = require("../middleware/requireDb");

const router = express.Router();

// Public route — website enquiry (no auth)
router.post("/enquiry", requireDb, createBooking);

const guard = [requireDb, auth, requireRole(["admin", "staff"])];

router.get("/stats", ...guard, getStats);
router.get("/", ...guard, listBookings);
router.get("/:id", ...guard, getBooking);
router.post("/", ...guard, createBooking);
router.put("/:id", ...guard, updateBooking);
router.delete("/:id", requireDb, auth, requireRole(["admin"]), deleteBooking);

module.exports = router;
