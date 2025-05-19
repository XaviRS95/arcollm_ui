import './ChatComponentStyles.css';
import { useGeneratorHook } from '../../hooks/getChatGeneratorHook.jsx';

export default function ChatComponentMain({ message, model, options, conversation, user_mail, conversation_id}) {

    const generatedMessages = useGeneratorHook(message, model, options, conversation, user_mail, conversation_id);

    return (
        <div id="ChatComponentMain">
            {generatedMessages}
        </div>
    );
}