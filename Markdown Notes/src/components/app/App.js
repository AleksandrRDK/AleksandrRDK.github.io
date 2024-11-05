import { useState } from 'react';

import Header from '../Header/Header';
import NoteList from '../NoteList/NoteList';
import NoteEditor from '../NoteEditor/NoteEditor';

import './app.scss';

const App = () => {

    const [notes, setNotes] = useState([]);
    const [editingNote, setEditingNote] = useState(null);

    const addNote = (note) => {
        setNotes([...notes, note]);
    }

    const editNote = (note) => {
        setEditingNote(note);
    }

    const saveNote = (updateNote) => {
        setNotes(notes.map(note => note.id === updateNote.id ? updateNote : note));
        setEditingNote(null);
    }

    const deleteNote = (id) => {
        setNotes(notes.filter(note => note.id !== id));
    }

    return (
        <div className='container'>
            <Header/>
            <div className='main__shield'>
                <NoteList notes={notes} onEdit={editNote} onDelete={deleteNote}/>
                <div className='editors__wrapper'>
                    <NoteEditor onSave={saveNote} onAdd={addNote} editingNote={editingNote}/>
                </div>
            </div>
        </div>
    );
}

export default App;
