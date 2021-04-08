const mongoose = require('mongoose')

const NoteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Harus di isi'],
        unique: true,
        trim: true,
        maxlength: [40, 'Title tidak boleh lebih dari 40 karakter']
    },
    description: {
        type: String,
        required: true,
        maxlength: [200, 'Deskripsi hanya boleh 200 karakter']
    }
})

module.exports = mongoose.models.Note || mongoose.model('Note', NoteSchema);