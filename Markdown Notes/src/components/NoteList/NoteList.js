import NoteItem from '../NoteItem/NoteItem';

import './NoteList.scss'

const NoteList = ({notes, onEdit, onDelete}) => {
    return (
        <div className="notelist">
            <h2>Список заметок:</h2>
            <div className="notelist__wrapper">
                <ul className="notelist__ul">
                    {notes.map(note => (
                        <li key={note.id} className="notelist__li">
                            <NoteItem
                                title={note.title}
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