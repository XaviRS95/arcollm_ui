export async function getConversationsCall(user_mail) {
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const API_CONVERSATIONS_LIST_REQUEST = import.meta.env.VITE_API_CONVERSATIONS_LIST_REQUEST;
    const response = await fetch(BASE_URL + API_CONVERSATIONS_LIST_REQUEST + "/" + user_mail, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
    if (!response.ok) {
        throw new Error("Failed to fetch convesations for user "+user_mail);
    }
    const data = await response.json();
    return data.conversations.map(([id, title]) => ({
        id,
        title
    }));
}