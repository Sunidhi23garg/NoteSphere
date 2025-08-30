const Note = require("../models/Note");
const addNote = async (req, res, next) => {
  try {
    const note = await Note.create({ ...req.body, user: req.user.id });
    req.io.emit("noteAdded", note);
    res.status(201).json(note);
  } catch (err) { next(err); }
};

const getNotes = async (req, res, next) => {
  try {
    const notes = await Note.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json({ notes });
  } catch (err) { 
    console.error("Error in getNotes:", err); 
    next(err); 
  }
};

const updateNote = async (req, res, next) => {
  try {
    const note = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
    req.io.emit("noteUpdated", note);
    res.json(note);
  } catch (err) { next(err); }
};

const deleteNote = async (req, res, next) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    req.io.emit("noteDeleted", { id: req.params.id });
    res.json({ message: "Deleted" });
  } catch (err) { next(err); }
};

const adminAllNotes = async (req, res, next) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.json({ notes });
  } catch (err) { next(err); }
};

module.exports = { addNote, getNotes, updateNote, deleteNote, adminAllNotes };