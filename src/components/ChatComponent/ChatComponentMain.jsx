import './ChatComponentStyles.css';
import { useGeneratorHook } from '../../hooks/getChatGeneratorHook.jsx';

export default function ChatComponentMain({ message, model, options }) {
    const generatedMessages = useGeneratorHook(message, model, options);

    return (
        <div id="ChatComponentMain">
            {generatedMessages}
        </div>
    );
}