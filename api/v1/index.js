const express = require('express');
const notesRouter = express.Router();
const mongoose = require("mongoose");
const Note = require("../../db/models/note.model");

// get all notes
notesRouter.get('/', (req, res) => {
    Note.find({}, (err, notes) => {
        if (err) {
            return console.error(err);
        } else {
            res.json({notes});
        }
    });
});

// add a new note
notesRouter.post('/', (req, res) => {
    const newNote = new Note (req.body);
    newNote.save().then((savedNote) => {
        res.json({
            note: savedNote,
            success: true
        });
    });
});

// delete a note by id
notesRouter.delete('/:id', (req, res) => {
    const noteId = req.params.id;
    Note.findByIdAndDelete({_id: noteId}, (err, deletedNote) => {
        if (err) {
            return console.error(err);
        } 
        if (!deletedNote) {
            return res.status(404).json({
                message: "Note not found for deletion"
            });
        };
        res.json({
            reply: "delete note by id success",
        })
    });
});

// get a note by id
notesRouter.get('/:id', (req, res) => {
    const noteId = req.params.id;
    Note.findById({_id: noteId}, (err, note) => {
        if (err) {
            return console.error(err);
        }
        if (!note) {
            return res.status(404).json({
                message: "Note not found"
            });
        };
        res.json({
            note,
            status: "success"
        });
    });
});

notesRouter.put('/:id', (req, res) => {
    const noteId = req.params.id;
    const updatedBody = req.body;
    // updatedNote is tehe old note before before updation
    // using new so that the updatedNote is the new note after updation
    Note.findByIdAndUpdate({_id: noteId}, updatedBody, {new: true}, (err, updatedNode) => {
        if (err) {
            return console.error(err);
        };
        if (!updatedNode) {
            return res.status(404).json({
                message: "Note not found for updation"
            });
        };
        res.json({
            reply: "updated note by id",
            note: updatedNode
        });
    });
});

module.exports = {
    notesRouter
};