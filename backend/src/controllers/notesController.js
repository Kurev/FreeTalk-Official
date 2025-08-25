import Note from '../models/Note.js';

export const getAllNotes = async (_, res) => {
    try {
        const notes = await Note.find().sort({ createdAt: -1 }); // Sort by createdAt in descending order
        res.status(200).json(notes);
    } catch (error) {
        console.error("Error fetching notes:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getNoteById = async (req, res) => {
    try {
        const noteId = req.params.id;
        const note = await Note.findById(noteId);
        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }
        res.status(200).json(note);
    } catch (error) {
        console.error("Error fetching getNoteById:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const createNotes = async (req, res) => {
    try {
        const { title, content } = req.body;
        const note = new Note({ title, content });

        const saveNotes = await note.save();
        res.status(201).json({ message: "Note created successfully", saveNotes });
    } catch (error) {
        console.error("Error fetching createNotes:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const updateNotes = async (req, res) => {
    try {
        const noteId = req.params.id;
        const { title, content } = req.body;
        const updatedNotes = await Note.findByIdAndUpdate(
            noteId,
            { title, content },
            {
                new: true
            }
        );
        if (!updatedNotes) return res.status(404).json({ message: "Note not found" });

        res.status(200).json(updatedNotes);
    } catch (error) {
        console.error("Error fetching updateNotes:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const deleteNotes = async (req, res) => {
    try {
        const noteId = req.params.id;
        const deleteNotes =  await Note.findByIdAndDelete(noteId)
        if (!deleteNotes) return res.status(404).json({ message: "Note not found" });
        res.status(200).json({ message: "Note deleted successfully" });
    } catch (error) {
        console.error("Error fetching deleteNotes:", error);
        res.status(500).json({ message: "Internal server error" });
    }

}

export const likeNotes = async (req, res) => {
    try {
        const noteId = req.params.id;
        const note = await Note.findById(noteId);
        if (!note) return res.status(404).json({ message: "Note not found" });
        note.likes += 1; // Increment the Likes count
        const updatedNote = await note.save();
        res.status(200).json(updatedNote);
    } catch (error) {
        console.error("Error fetching likeNotes:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}