import { useEffect, useState } from "react";
import { getConversationsCall} from "../api/getConversationsCall.jsx";

export function useConversationsListHook(user_mail) {
    const [conversations, setConversations] = useState([]);
    useEffect(() => {
        async function loadConversationsCall() {
            const response = await getConversationsCall(user_mail);
            setConversations(response);
        }

        if (user_mail) {
            console.log(user_mail);
            loadConversationsCall();
        }
    }, [user_mail]);
    return conversations;
}