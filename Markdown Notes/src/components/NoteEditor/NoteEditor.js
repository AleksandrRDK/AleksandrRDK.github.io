import { v4 as uuidv4 } from 'uuid';
import { useState, useEffect } from 'react';

import MarkdownPreviewer from '../MarkdownPreviewer/MarkdownPreviewer';
import './NoteEditor.scss';

const NoteEditor = ({ onSave, onAdd, editingNote}) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        if (editingNote) {
            setTitle(editingNote.title)
            setContent(editingNote.content)
        } else {
            setTitle('')
            setContent('')
        }
    }, [editingNote]);

    const handleSave = () => {
        if (editingNote){
            onSave({ ...editingNote, title, content});
        } else {
            onAdd({ id: uuidv4(), title, content})
        }

        setTitle('');
        setContent('');
    }

    return (
        <div className="note-editor">
            <h2>Редактор заметок</h2>
            <input
                className='note-editor__input'
                type="text"
                placeholder='Заголовок'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
                className="note-editor__textarea"
                placeholder="Введите текст заметки..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
            ></textarea>
            <button className="note-editor__button" onClick={handleSave}>
                {editingNote ? "Сохранить изменения" : "Добавить Заметку"}
            </button>
            <div className="note-editor__preview">
                <h3>Предварительный просмотр</h3>
                <MarkdownPreviewer content={content} />
            </div>
        </div>
    );
};

export default NoteEditor;
