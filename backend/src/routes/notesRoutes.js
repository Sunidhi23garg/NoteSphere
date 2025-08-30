const express = require("express");
const router = express.Router();
const { addNote, getNotes, updateNote, deleteNote, adminAllNotes } = require("../controllers/notesController");
const { requireAuth, requireAdmin } = require("../middlewares/authMiddleware");

router.use(requireAuth);

router.post("/", addNote);
router.get("/", getNotes);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);
router.get("/admin/all", requireAdmin, adminAllNotes);

module.exports = router;
