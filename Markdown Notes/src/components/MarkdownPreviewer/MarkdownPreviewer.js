import { marked } from "marked";
import './MarkdownPreviewer.scss';

const MarkdownPreviewer = ({content}) => {
    const htmlContent = marked(content);

    return (
        <div className="markdown-previewer" dangerouslySetInnerHTML={{ __html: htmlContent }}></div>
    )
}

export default MarkdownPreviewer;