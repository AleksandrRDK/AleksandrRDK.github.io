import { v4 as uuidv4 } from 'uuid';
import { useState, useEffect } from 'react';
import MarkdownPreviewer from '../MarkdownPreviewer/MarkdownPreviewer';
import CopyNotification from '../CopyNotification/CopyNotification';
import './NoteEditor.scss';

const NoteEditor = ({ onSave, onAdd, editingNote }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [showNotification, setShowNotification] = useState(false);
    const [showTips, setShowTips] = useState(false);

    useEffect(() => {
        if (editingNote) {
            setTitle(editingNote.title);
            setContent(editingNote.content);
        } else {
            setTitle('');
            setContent('');
        }
    }, [editingNote]);

    const handleSave = () => {
        if (editingNote) {
            onSave({ ...editingNote, title, content });
        } else {
            onAdd({ id: uuidv4(), title, content });
        }
        setTitle('');
        setContent('');
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(content)
            .then(() => setShowNotification(true))
            .catch((error) => console.error("Ошибка копирования: ", error));
    };

    const closeNotification = () => setShowNotification(false);

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
            <button
                className="note-editor__tips-button"
                onClick={() => setShowTips(!showTips)}
                aria-label="Подсказки по Markdown"
            >
                ?
            </button>
            {showTips && (
                <div className="markdown-tips">
                    <h3>Подсказки по Markdown:</h3>
                    <ul>
                        <li><code># Заголовок</code> - заголовок</li>
                        <li><code>**жирный текст**</code> - жирный текст</li>
                        <li><code>*курсив*</code> - курсив</li>
                        <li><code>[ссылка](url)</code> - ссылка</li>
                        <li><code>- Список</code> - элемент списка</li>
                    </ul>
                </div>
            )}
            <button className="note-editor__button" onClick={handleSave}>
                {editingNote ? "Сохранить изменения" : "Добавить Заметку"}
            </button>
            <button className="note-editor__button" onClick={handleCopy}>Копировать HTML</button>
            <div className="note-editor__preview">
                <MarkdownPreviewer content={content} />
            </div>
            {showNotification && (
                <CopyNotification
                    message="HTML скопирован!"
                    onClose={closeNotification}
                />
            )}
        </div>
    );
};

export default NoteEditor;
