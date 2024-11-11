import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import './MarkdownPreviewer.scss';

const MarkdownPreviewer = ({ content }) => {
    const [isTextCentered, setIsTextCentered] = useState(false);
    const [isHeadingCentered, setIsHeadingCentered] = useState(false);

    const toggleTextCenter = () => {
        setIsTextCentered(prev => !prev);
    };

    const toggleHeadingCenter = () => {
        setIsHeadingCentered(prev => !prev);
    };

    return (
        <div className={`markdown-previewer`}>
            <h3>Предварительный просмотр</h3>
            <div className="markdown-previewer__controls">
                <button onClick={toggleTextCenter}>
                    {isTextCentered ? 'Отменить выравнивание текста' : 'Выровнять текст по центру'}
                </button>
                <button onClick={toggleHeadingCenter}>
                    {isHeadingCentered ? 'Отменить выравнивание заголовков' : 'Выровнять заголовки по центру'}
                </button>
            </div>
            <div
                className={`markdown-previewer__content
                    ${isTextCentered ? 'center-text' : ''}
                    ${isHeadingCentered ? 'center-headings' : ''}`}
            >
                <ReactMarkdown>{content}</ReactMarkdown>
            </div>
        </div>
    );
};

export default MarkdownPreviewer;
