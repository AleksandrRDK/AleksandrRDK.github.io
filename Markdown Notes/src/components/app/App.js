import { useState, useEffect } from 'react';

import Header from '../Header/Header';
import NoteList from '../NoteList/NoteList';
import NoteEditor from '../NoteEditor/NoteEditor';

import './app.scss';

const App = () => {

    const [notes, setNotes] = useState([]);
    const [editingNote, setEditingNote] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const storedNotes = JSON.parse(localStorage.getItem('notes')) || [];
        setNotes(storedNotes);
    },[])

    useEffect(() => {
        localStorage.setItem('notes', JSON.stringify(notes));
    }, [notes])

    const addNote = (note) => {
        const newNote = {
            ...note,
            createdDate: new Date().toLocaleDateString(),
        }

        setNotes([...notes, newNote]);
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

    const filteredNotes = notes.filter(note =>
        note.title.toLowerCase().includes(searchQuery.toLocaleLowerCase())
    );

    return (
        <div className='container'>
            <Header/>
            <div className='main__shield'>
                <NoteList
                    notes={filteredNotes}
                    onEdit={editNote}
                    onDelete={deleteNote}
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                />
                <div className='editors__wrapper'>
                    <NoteEditor onSave={saveNote} onAdd={addNote} editingNote={editingNote}/>
                </div>
            </div>
        </div>
    );
}

export default App;
