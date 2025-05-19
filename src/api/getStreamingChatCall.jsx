

export async function getStreamingChatCall(prompt, model, options, messageHistory, user_mail, conversation_id, onStreamChunk) {
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const API_ASYNC_REQUEST = import.meta.env.VITE_API_ASYNC_REQUEST;

    let streamedText = "";

    try {
        messageHistory.push({ role: 'user', content: prompt });

        var body = JSON.stringify({
            messages: messageHistory,
            options,
            model,
            user_mail: user_mail,
            conversation_id: conversation_id})

        console.log(body);

        const response = await fetch(BASE_URL + API_ASYNC_REQUEST, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: body
        });

        const reader = response.body.getReader();
        const decoder = new TextDecoder("utf-8");

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            streamedText += decoder.decode(value);
            onStreamChunk(streamedText);
        }

        messageHistory.push({ role: 'assistant', content: streamedText });

    } catch (error) {
        console.error("Streaming error:", error);
    }
}