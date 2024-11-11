import { useEffect } from "react";
import './CopyNotification.scss';

const CopyNotification = ({message, onClose}) => {
    useEffect(() => {
        const timer = setTimeout(onClose, 3000);
        return () => clearTimeout(timer);
    }, [onClose])

    return (
        <div className="copy-notification">
            {message}
        </div>
    )
}

export default CopyNotification;