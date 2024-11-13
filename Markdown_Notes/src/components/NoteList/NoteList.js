import NoteItem from '../NoteItem/NoteItem';

import './NoteList.scss'

const NoteList = ({notes, onEdit, onDelete, searchQuery, onSearchChange}) => {
    return (
        <div className="notelist">
            <div className='notelist__shield'>
                <h2>Список заметок:</h2>
                <input
                    type="text"
                    className="notelist__search"
                    placeholder="Поиск по заголовкам..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                />
            </div>
            <div className="notelist__wrapper">
            {notes.length === 0 && <p className="no-notes-message">Нет заметок</p>}
                <ul className="notelist__ul">
                    {notes.map(note => (
                        <li key={note.id} className="notelist__li">
                            <NoteItem
                                title={note.title}
                                createdDate={note.createdDate}
                                content={note.content}
                                onEdit={() => onEdit(note)}
                                onDelete={() => onDelete(note.id)}
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
};

export default NoteList;