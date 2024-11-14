import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import './MarkdownPreviewer.scss';

const MarkdownPreviewer = ({ content }) => {
    const [isTextCentered, setIsTextCentered] = useState(false);
    const [isHeadingCentered, setIsHeadingCentered] = useState(false);
    const [hasHeadings, setHasHeadings] = useState(false);
    const [hasText, setHasText] = useState(false);

    useEffect(() => {
        // Проверка на наличие заголовков в контенте
        const headingRegex = /^(#{1,6})\s.+/gm;  // Markdown синтаксис для заголовков
        setHasHeadings(headingRegex.test(content));

        // Проверка на наличие текста, не включая заголовки и другие markdown элементы
        const textRegex = /[^\s#>\-\*\d\.][\w\s]/g; // Простое условие для наличия текста
        setHasText(textRegex.test(content));
    }, [content]);

    const toggleTextCenter = () => {
        setIsTextCentered(prev => !prev);
    };

    const toggleHeadingCenter = () => {
        setIsHeadingCentered(prev => !prev);
    };

    return (
        <div className="markdown-previewer">
            <h3>Предварительный просмотр</h3>
            <div className="markdown-previewer__controls">
                {hasText && (
                    <button onClick={toggleTextCenter}>
                        {isTextCentered ? 'Отменить выравнивание текста' : 'Выровнять текст по центру'}
                    </button>
                )}
                {hasHeadings && (
                    <button onClick={toggleHeadingCenter}>
                        {isHeadingCentered ? 'Отменить выравнивание заголовков' : 'Выровнять заголовки по центру'}
                    </button>
                )}
            </div>
            <div
                className={`markdown-previewer__content
                    ${isTextCentered ? 'center-text' : ''}
                    ${isHeadingCentered ? 'center-headings' : ''}`}
            >
                {content ? (
                    <ReactMarkdown>{content}</ReactMarkdown>
                ) : (
                    <div className='markdown-previewer__nothing__message'>здесь пока ничего нет</div>
                )}
            </div>
        </div>
    );
};

export default MarkdownPreviewer;
